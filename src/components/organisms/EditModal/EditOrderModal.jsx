import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrdersByDate, assignShipperToOrder } from '@/data/OrderAPI';
import { getAllShippers } from '@/data/ShipperAPI';

function EditOrderModal({ date, onClose }) {
    const [orders, setOrders] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [shipperAssignments, setShipperAssignments] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const dateStr = date.split('T')[0];
                const ordersData = await getOrdersByDate(dateStr);
                console.log('Fetched orders:', ordersData);
                const initialAssignments = {};
                ordersData.forEach(order => {
                    initialAssignments[order._id] = {
                        selectedShipper: order.order.shipper || '',
                        shipperAssigned: !!order.order.shipper
                    };
                });
                setOrders(ordersData);
                setShipperAssignments(initialAssignments);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        const fetchShippers = async () => {
            try {
                const shippersData = await getAllShippers();
                console.log('Fetched shippers:', shippersData);
                setShippers(shippersData);
                setShipperAssignments(prevState => {
                    const updatedAssignments = { ...prevState };
                    orders.forEach(order => {
                        if (!updatedAssignments[order._id].shipperAssigned) {
                            updatedAssignments[order._id].selectedShipper = '';
                        }
                    });
                    return updatedAssignments;
                });
            } catch (error) {
                console.error('Failed to fetch shippers:', error);
            }
        };

        fetchOrders();
        fetchShippers();
    }, [date]);

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

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Assign Shipper to Order</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Assign the shipper to order below.</p>

            <div className="overflow-x-auto">
                <form>
                    <div className="sm:col-span-6 mt-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '800px' }}>
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
                                            Order Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Shipper Actions
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
                                                    {order.order.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
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
                                                        className={`ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${shipperAssignments[order._id]?.shipperAssigned ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                                                    >
                                                        {shipperAssignments[order._id]?.shipperAssigned ? 'Assigned' : 'Assign'}
                                                    </button>
                                                    {!shipperAssignments[order._id]?.shipperAssigned && (
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
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
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
