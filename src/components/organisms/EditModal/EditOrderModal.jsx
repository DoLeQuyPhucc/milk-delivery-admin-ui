import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrdersByDate } from '@/data/OrderAPI';
import { updateOrderStatusById } from '@/data/OrderAPI';
import { getAllShippers } from '@/data/ShipperAPI';

function EditOrderModal({ date, onClose }) {
    const [orders, setOrders] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState('');
    const [shipperAssigned, setShipperAssigned] = useState(false); // Track if a shipper has been assigned

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const dateStr = date.split('T')[0]; // Extract date string from ISO format
                const ordersData = await getOrdersByDate(dateStr);
                console.log('Fetched orders:', ordersData);
                setOrders(ordersData);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        const fetchShippers = async () => {
            try {
                const shippersData = await getAllShippers();
                console.log('Fetched shippers:', shippersData);
                setShippers(shippersData);
            } catch (error) {
                console.error('Failed to fetch shippers:', error);
            }
        };

        fetchOrders();
        fetchShippers();
    }, [date]); // Fetch orders and shippers whenever date changes

    const handleShipperChange = (e) => {
        setSelectedShipper(e.target.value);
    };

    const handleCancel = () => {
        setSelectedShipper('');
        setShipperAssigned(false); // Reset shipper assignment
    };

    const handleCancelOrder = async () => {
        try {
            // Example: Implement cancel order functionality
            // await cancelOrderById(orders[0]._id);
            console.log('Order canceled successfully!');
            alert('Order canceled successfully!');
            onClose();
            // window.location.reload(); // Example: Reload the page to reflect changes
        } catch (error) {
            console.error('Failed to cancel order:', error);
            alert('Error canceling order. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateOrderStatusById(orders[0]._id, { shipper: selectedShipper }); // Assuming orders[0] as there's typically one order per date
            console.log('Order status updated successfully!');
            alert('Order status updated successfully!');
            setShipperAssigned(true); // Mark shipper as assigned
            onClose();
            // window.location.reload(); // Example: Reload the page to reflect changes
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Error updating order status. Please try again.');
        }
    };

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Update Order Status</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Update the order status below.</p>

            <div className="overflow-x-auto">
                <form onSubmit={handleSubmit}>
                    <div className="sm:col-span-6 mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Delivery Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Shipper Actions
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No orders found for the selected date.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.shippingAddress.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.shippingAddress.fullName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Delivered: {order.order.isDelivered ? 'Yes' : 'No'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {!order.order.isDelivered && !shipperAssigned && (
                                                    <>
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
                                                        <div className="flex mt-2">
                                                            <button
                                                                type="button"
                                                                onClick={handleCancel}
                                                                className="inline-flex justify-center py-2 px-4 mr-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                            >
                                                                Cancel Shipper
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                Apply Shipper
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={handleCancelOrder}
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Cancel Order
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditOrderModal.propTypes = {
    date: PropTypes.string.isRequired, // Prop type changed to `date` instead of `orderId`
    onClose: PropTypes.func.isRequired
};

export default EditOrderModal;
