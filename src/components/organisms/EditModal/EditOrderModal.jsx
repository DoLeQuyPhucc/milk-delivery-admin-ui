import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { assignShipperToOrder, getOrdersByDate } from '@/data/OrderAPI';
import { getAllShippers } from '@/data/ShipperAPI';

function EditOrderModal({ date, onClose }) {
    const [orders, setOrders] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [shipperAssignments, setShipperAssignments] = useState({});
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dateStr = date.split('T')[0];
                const ordersData = await getOrdersByDate(dateStr);
                const initialAssignments = {};
                ordersData.forEach(order => {
                    initialAssignments[order._id] = {
                        selectedShipper: order.order.shipper || '',
                        shipperAssigned: !!order.order.shipper
                    };
                });

                // Filter orders where shipper is null
                const filteredOrders = ordersData.filter(order => !order.order.shipper);

                setOrders(filteredOrders);
                setShipperAssignments(initialAssignments);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        const fetchShippers = async () => {
            try {
                const shippersData = await getAllShippers();
                setShippers(shippersData);
            } catch (error) {
                console.error('Failed to fetch shippers:', error);
            }
        };

        fetchData();
        fetchShippers();
    }, [date]);

    const handleCheckboxChange = (orderId) => {
        setSelectedOrders(prevSelected => {
            if (prevSelected.includes(orderId)) {
                return prevSelected.filter(id => id !== orderId);
            } else {
                return [...prevSelected, orderId];
            }
        });
    };

    const handleShipperChange = (e) => {
        setSelectedShipper(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (selectedOrders.length === 0 || !selectedShipper) {
            alert('Please select orders and a shipper to assign.');
            return;
        }
    
        try {
            const promises = selectedOrders.map(async (orderId) => {
                const { selectedShipper } = shipperAssignments[orderId];
                const order = orders.find(order => order._id === orderId);
                let itemIds = [];
    
                if (order && order.order && Array.isArray(order.order)) {
                    itemIds = order.order.map(item => item._id); // Collect all itemIds
                } else if (order && order.order && order.order._id) {
                    itemIds = [order.order._id];
                } else {
                    console.error('Invalid structure for order items:', order.order);
                    return;
                }
    
                await assignShipperToOrder(orderId, selectedShipper, itemIds);
                console.log(`Shipper assigned successfully to order ${orderId}!`);
                return orderId;
            });
    
            await Promise.all(promises);
            alert('Shippers assigned successfully!');
            setSelectedOrders([]);
            onClose(); // Close modal after successful assignment
        } catch (error) {
            console.error('Failed to assign shippers:', error);
            alert('Error assigning shippers. Please try again.');
        }
    };
    

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Assign Shipper to Orders</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Assign shippers to selected orders below.</p>

            <div className="overflow-x-auto">
                <form onSubmit={handleSubmit}>
                    <div className="sm:col-span-6 mt-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '800px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Select
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Full Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No orders found for the selected date or all orders already have a shipper assigned.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedOrders.includes(order._id)}
                                                        onChange={() => handleCheckboxChange(order._id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {order.shippingAddress.address}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {order.shippingAddress.fullName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {order.order.status}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="sm:col-span-6 mt-6">
                        <label htmlFor="shipper" className="block text-sm font-medium leading-6 text-gray-900">
                            Assign Shipper
                        </label>
                        <select
                            id="shipper"
                            name="shipper"
                            value={selectedShipper}
                            onChange={handleShipperChange}
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                        >
                            <option value="">Select a shipper...</option>
                            {shippers.map((shipper) => (
                                <option key={shipper._id} value={shipper._id}>
                                    {shipper.shipperName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={selectedOrders.length === 0 || !selectedShipper}
                        >
                            Assign Shippers
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditOrderModal.propTypes = {
    date: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditOrderModal;
