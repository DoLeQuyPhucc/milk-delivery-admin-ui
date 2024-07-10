import axios from 'axios';

export async function getAllProducts() {
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/products/getAllProducts';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

  
  export const createProduct = async (productData) => {
    const apiUrl = 'https://milk-delivery-api.onrender.com/api/products/';
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(apiUrl, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };
  export const getProductById = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
  
    try {
      const url = `https://milk-delivery-api.onrender.com/api/products/${productId}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product information');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
        // Optionally, handle token refresh or redirect to login page
      }
      console.error('Error fetching product information:', error);
      throw error;
    }
  };
  export const updateProductById = async (productId, updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
  
    try {
      const url = `https://milk-delivery-api.onrender.com/api/products/${productId}`;
      const response = await axios.put(url, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to update product information');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
        // Optionally, handle token refresh or redirect to login page
      }
      console.error('Error updating product information:', error);
      throw error;
    }
  };
  export const deleteProductById = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const url = `https://milk-delivery-api.onrender.com/api/products/${productId}`;
      const response = await axios.delete(url,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if the response is OK
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product information');
      }
    } catch (error) {
      console.error('Error fetching product information:', error);
      throw error;
    }
  };