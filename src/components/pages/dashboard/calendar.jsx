import React, { useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getAllOrders } from '@/data/OrderAPI';
import EditOrderModal from '@/components/organisms/EditModal/EditOrderModal';
import Modal from '@/components/organisms/Modal';
import { getOrdersByDate } from '@/data/OrderAPI';
import './calendar.css';

function OrderCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();

        // Step 1: Aggregate deliveries by date
        const deliveriesByDate = data.reduce((acc, order) => {
          order.circleShipment.tracking.forEach(tracking => {
            const dateStr = new Date(tracking.deliveredAt).toDateString();
            if (!acc[dateStr]) {
              acc[dateStr] = [];
            }
            acc[dateStr].push({
              ...order,
              tracking
            });
          });
          return acc;
        }, {});

        // Step 2: Format orders for display
        const formattedEvents = [];
        Object.keys(deliveriesByDate).forEach((date) => {
          const orders = deliveriesByDate[date];
          const numOrders = orders.length;
          const maxToShow = 3;

          // Display up to maxToShow orders
          for (let i = 0; i < Math.min(numOrders, maxToShow); i++) {
            formattedEvents.push({
              id: `${orders[i]._id}-${i}`,
              title: `Order`,
              start: new Date(orders[i].tracking.deliveredAt),
              description: `Total Price: ${orders[i].package.totalPrice}`,
            });
          }

          // If there are more orders than maxToShow, add a placeholder
          if (numOrders > maxToShow) {
            formattedEvents.push({
              id: `more-${date}`,
              title: `...${numOrders - maxToShow - 1} more order(s)`,
              start: new Date(date),
              // Ensure the rest of the placeholder object is correctly closed and formatted
            });
          }
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDetailsClick = async (date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      const orders = await getOrdersByDate(dateStr);
      setSelectedOrders(orders);
      setSelectedDate(date); // Update selected date
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching orders by date:', error);
    }
  };

  useEffect(() => {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
        headerToolbar: {
          left: 'dayGridMonth,timeGridWeek',
          center: 'title',
          right: 'prev,next',
        },
        initialView: 'dayGridMonth',
        editable: true,
        events: events,
        eventDidMount: function (info) {
          const dateStr = info.event.start.toISOString().split('T')[0];
          const cell = document.querySelector(`.fc-daygrid-day[data-date="${dateStr}"]`);

          if (cell && events.some(event => event.start.toISOString().split('T')[0] === dateStr)) {
            const existingButton = cell.querySelector('.details-button');
            if (existingButton) {
              existingButton.remove();
            }

            const button = document.createElement('button');
            button.className = 'details-button';
            button.textContent = 'Details';
            button.addEventListener('click', (e) => {
              e.preventDefault();
              handleDetailsClick(info.event.start);
            });

            // Place button at the bottom center of the cell
            cell.style.position = 'relative';
            button.style.position = 'absolute';
            button.style.bottom = '0';
            button.style.left = '50%';
            button.style.transform = 'translateX(-50%)';
            cell.appendChild(button);
          }
        },
      });

      calendar.render();
    }
  }, [events]);

  return (
    <div>
      <div id="calendar"></div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedDate && (
          <EditOrderModal
            date={selectedDate.toISOString()} // Pass the selected date as orderId (example format)
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default OrderCalendar;
