import React, { useEffect, useState } from 'react';
import { getOrdersByDate, assignShipperToOrder } from '@/data/OrderAPI';
import { getAllShippers } from '@/data/ShipperAPI';
import { Card, CardHeader, CardBody, Typography, Chip } from '@material-tailwind/react';
import Modal from '@/components/organisms/Modal'; 
import EditOrderModal from '@/components/organisms/EditModal/EditOrderModal';
import './calendar.css';

function ShipmentManagement() {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(today);
  const [orders, setOrders] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [shipperAssignments, setShipperAssignments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editModalDate, setEditModalDate] = useState(''); 

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    try {
      const ordersData = await getOrdersByDate(date);
      setOrders(ordersData);

      const initialAssignments = {};
      ordersData.forEach(order => {
        initialAssignments[order._id] = {
          selectedShipper: order.shipper || '',
          shipperAssigned: !!order.shipper,
        };
      });
      setShipperAssignments(initialAssignments);
    } catch (error) {
      console.error('Error fetching orders by date:', error);
    }
  };

  const handleShipperChange = (orderId, e) => {
    const value = e.target.value;
    setShipperAssignments(prevState => ({
      ...prevState,
      [orderId]: { ...prevState[orderId], selectedShipper: value }
    }));
  };

  const handleSubmit = async (orderId, e) => {
    e.preventDefault();

    try {
      const { selectedShipper } = shipperAssignments[orderId];
      const order = orders.find((order) => order._id === orderId);

      if (!order || !order.order) {
        console.error('Invalid structure for order items:', order);
        return;
      }
      let itemIds = [];
      if (order.order && Array.isArray(order.order)) {
        itemIds = order.order.map(item => item._id);
      } else if (order.order && order.order._id) {
        itemIds = [order.order._id];
      } else {
        console.error('Invalid structure for order items:', order.order);
        return;
      }
      let orderIds = [];
      if (Array.isArray(order.order)) {
        orderIds = order.order.map(o => o._id);
      } else if (order._id) {
        orderIds = [order._id];
      } else {
        console.error('Invalid structure for order:', order);
        return;
      }

      const requestBody = {
        orderIds,
        shipperId: selectedShipper,
        itemIds,
      };
      console.log('Request Body:', requestBody);
      const token = localStorage.getItem('token')
      // Log headers if any
      const headers = {
        'Content-Type': 'application/json',
        // Add Authorization header if required
        'Authorization': 'Bearer ' + token // Replace `token` with your actual token
      };
      console.log('Headers:', headers);

      await assignShipperToOrder(requestBody, headers);
      console.log(`Shipper assigned successfully to order ${orderId}!`);

      // Refresh orders after assignment
      const updatedOrders = await getOrdersByDate(selectedDate);
      setOrders(updatedOrders);

      alert('Shipper assigned successfully!');
      setSelectedOrders([]); // Clear selected orders
    } catch (error) {
      console.error('Failed to assign shipper:', error);
      alert('Error assigning shipper. Please try again.');
    }
  };

  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const shippersData = await getAllShippers();
        setShippers(shippersData);
      } catch (error) {
        console.error('Failed to fetch shippers:', error);
      }
    };

    fetchShippers();
    handleDateChange(today); // Fetch orders for today's date on initial render
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'yellow';
      case 'Complete':
        return 'green';
      case 'Canceled':
        return 'red';
      default:
        return 'blue-gray';
    }
  };

  const getPaymentColor = (isPaid) => {
    switch (isPaid) {
      case true:
        return 'green';
      case false:
        return 'red';
      default:
        return 'blue-gray';
    }
  };

  const getShipperNameById = (shipperId) => {
    const shipper = shippers.find(shipper => shipper._id === shipperId);
    return shipper ? shipper.shipperName : 'N/A';
  };

  const openEditModal = (date) => {
    setIsModalOpen(true);
    setEditModalDate(date);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderSelect = (orderId) => {
    setSelectedOrders(prevState =>
      prevState.includes(orderId)
        ? prevState.filter(id => id !== orderId)
        : [...prevState, orderId]
    );
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeEditModal}>
        {selectedDate && (
          <EditOrderModal
            date={editModalDate} // Pass the selected date to EditOrderModal
            onClose={closeEditModal}
          />
        )}
      </Modal>
      <div className="date-picker">
        <label htmlFor="order-date">Select Date: </label>
        <input
          type="date"
          id="order-date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12 ">
        <button
          onClick={() => openEditModal(selectedDate)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 translate-x-1/2 "
        >
          Assign Shipper to Multiple Shipments
        </button>

        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Shipments Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Number", "Paying Status", "Total Price", "Status", "Address", "Shipper", "Customer", "Actions"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, key) => {
                  const className = `py-3 px-5 ${key === orders.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                  const shipperName = getShipperNameById(order.order.shipper);

                  return (
                    <tr key={order._id}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {key + 1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant='gradient'
                          color={getPaymentColor(order.order.isPaid)}
                          value={order.order.isPaid ? 'Paid' : 'Unpaid'}
                          className='py-0.5 px-2 text-[11px] font-medium w-fit'
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order.package.totalPriceDiscount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={getStatusColor(order.order.status)}
                          value={order.order.status}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center">
                          <Typography className="text-xs font-semibold text-blue-gray-600 ml-2">
                            {shipperName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order.shippingAddress.fullName}
                        </Typography>
                      </td>
                      <td className={className}>
                        {shipperName === 'N/A' && order.order.shipper == null && (
                          <>
                            {!shipperAssignments[order._id]?.shipperAssigned && (
                              <>
                                <select
                                  value={shipperAssignments[order._id]?.selectedShipper || ''}
                                  onChange={(e) => handleShipperChange(order._id, e)}
                                  disabled={shipperAssignments[order._id]?.shipperAssigned}
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                  <option value="">Select shipper</option>
                                  {shippers.map((shipper) => (
                                    <option key={shipper._id} value={shipper._id}>
                                      {shipper.shipperName}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  onClick={(e) => handleSubmit(order._id, e)}
                                  disabled={!shipperAssignments[order._id]?.selectedShipper || shipperAssignments[order._id]?.shipperAssigned}
                                  className={`ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${shipperAssignments[order._id]?.shipperAssigned ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    }`}
                                >
                                  {shipperAssignments[order._id]?.shipperAssigned ? 'Assigned' : 'Assign'}
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ShipmentManagement;
