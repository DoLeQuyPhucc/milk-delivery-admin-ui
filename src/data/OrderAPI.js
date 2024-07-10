import axios from "axios";
import { func } from "prop-types";

export async function getAllOrders() {
    const url = 'https://milk-delivery-api.onrender.com/api/orders/getAllOrders';
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}
export async function getOrderById(orderId){
    const url = `https://milk-delivery-api.onrender.com/api/orders/${orderId}`;
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }   
}

export async function updateOrderStatusById(orderId) {
    const url = `https://milk-delivery-api.onrender.com/api/orders/${orderId}/status`;
    const token = localStorage.getItem('token');
    try {
        const response = await axios.patch(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }   
}
export const getOrdersByDate = async (date) => {
    try {
      const response = await axios.get(`https://milk-delivery-api.onrender.com/api/orders/getByDate/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by date:', error);
      throw error;
    }
  };
