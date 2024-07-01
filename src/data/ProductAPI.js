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

getAllProducts().then(products => {
    console.log(products);
  }).catch(error => {
    console.error('Error fetching products:', error);
  });
  
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