import axios from 'axios';

// Function to get all shippers
export const getAllShippers = async () => {
    const token = localStorage.getItem('token');
  try {
    const response = await axios.get('https://milk-delivery-api.onrender.com/api/shippers/getAllShippers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const shippers = response.data;
    return shippers;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching shippers:', error);
    throw error;
  }
};
export const createShipper = async (shipperData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('https://milk-delivery-api.onrender.com/api/shippers', shipperData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }  
      });
      return response.data;
    } catch (error) {
      console.error('Error creating shipper:', error);
      throw error;
    }
  };
  export const getShipperById = async (shipperId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`https://milk-delivery-api.onrender.com/api/shippers/${shipperId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch shipper information:', error);
      throw error;
    }
  };
  export const updateShipperById = async (shipperId, shipperData) => {
    try {
      const token = localStorage.getItem('token'); // Corrected the argument to be 'token' string
      const response = await axios.put(`https://milk-delivery-api.onrender.com/api/shippers/${shipperId}`, shipperData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update shipper information:', error);
      throw error;
    }
  };
  export const deleteShipperById = async (shipperId) => {
    try {
      const token = localStorage.getItem('token'); // Corrected the argument to be 'token' string
      const response = await axios.delete(`https://milk-delivery-api.onrender.com/api/shippers/${shipperId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update shipper information:', error);
      throw error;
    }
  };