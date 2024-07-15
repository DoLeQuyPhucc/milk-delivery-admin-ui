import axios from "axios";


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
  const token = localStorage.getItem('token');
  try {
      const response = await axios.get(`https://milk-delivery-api.onrender.com/api/orders/getByDate/${date}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching orders by date:', error);
      throw error;
  }
};


  // OrderAPI.js
export const assignShipperToOrder = async (requestBody, headers) => {
    const response = await fetch('https://milk-delivery-api.onrender.com/api/orders/assignShipper', {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    return await response.json();
  };
  
export async function getTotalDeliveredOrders(){
    const url = 'https://milk-delivery-api.onrender.com/api/orders/getOrder/total-delivered';
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total delivered orders:', error);
        throw error;
    }
} 
export async function getTotalCancelledOrders(){
    const url = 'https://milk-delivery-api.onrender.com/api/orders/getOrder/total-cancelled';
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total cancelled orders:', error);
        throw error;
    }
}
export async function getTotalOrdersInMonth(year, month){
    const url = `https://milk-delivery-api.onrender.com/api/orders/getOrder/total-in-month/${year}/${month}`;
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total orders in month:', error);
        throw error;
    }
}
export async function getTotalUserOrders(){
    const url = 'https://milk-delivery-api.onrender.com/api/orders/getOrder/total-user-orders';
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching total user orders:', error);
        throw error;
    }
}
export async function getTotalPriceOfAllOrders(){
    const url = 'https://milk-delivery-api.onrender.com/api/orders/getOrder/total-price-of-all-orders';
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching total price of all orders:', error);
        throw error;
    }
}
