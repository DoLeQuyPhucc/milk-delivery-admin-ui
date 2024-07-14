import React, { useEffect, useState } from 'react';
import { getOrdersByDate, assignShipperToOrder } from '@/data/OrderAPI';
import { getAllShippers } from '@/data/ShipperAPI';
import { Card, CardHeader, CardBody, Typography, Chip } from '@material-tailwind/react';
import './calendar.css';

function ShipmentManagment() {
  const [selectedDate, setSelectedDate] = useState('');
  const [orders, setOrders] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [shipperAssignments, setShipperAssignments] = useState({});

  const handleDateChange = async (event) => {
    const date = event.target.value;
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

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((id) => id !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  const handleShipperChange = (orderId, e) => {
    const value = e.target.value;
    setShipperAssignments(prevState => ({
      ...prevState,
      [orderId]: { ...prevState[orderId], selectedShipper: value }
    }));
  };

  const handleCancel = (orderId) => {
    setShipperAssignments(prevState => ({
      ...prevState,
      [orderId]: { ...prevState[orderId], selectedShipper: '', shipperAssigned: false }
    }));
  };

  const handleSubmit = async (orderId, e) => {
    e.preventDefault();
    const { selectedShipper } = shipperAssignments[orderId];
    const order = orders.find(order => order._id === orderId);
    const itemId = order?.order?._id;
    console.log('Submitting with:', { orderId, selectedShipper, itemId });

    if (!itemId) {
      console.error('ItemId is missing.');
      return;
    }

    try {
      await assignShipperToOrder(orderId, selectedShipper, itemId);
      console.log('Shipper assigned successfully!');
      alert('Shipper assigned successfully!');
      setShipperAssignments(prevState => ({
        ...prevState,
        [orderId]: { ...prevState[orderId], shipperAssigned: true }
      }));
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

  return (
    <div>
      <div className="date-picker">
        <label htmlFor="order-date">Select Date: </label>
        <input
          type="date"
          id="order-date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Orders Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      Select
                    </Typography>
                  </th>
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
                  const className = `py-3 px-5 ${key === orders.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={order._id}>
                      <td className={className}>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => handleCheckboxChange(order._id)}
                        />
                      </td>
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
                          {order.shippingAddress.fullName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center">
                          <Typography className="text-xs font-semibold text-blue-gray-600 ml-2">
                            {order.shipper}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                        </Typography>
                      </td>
                      
                      <td className={className}>
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
                        {shipperAssignments[order._id]?.shipperAssigned && (
                          <button
                            type="button"
                            onClick={() => handleCancel(order._id)}
                            className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel
                          </button>
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

export default ShipmentManagment;
