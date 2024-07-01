import axios from 'axios';

export const getAllStores = async () => {
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/stores/getAllStores';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    throw error;
  }
};

export const createStore = async (storeData) => {
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/stores';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(apiUrl, storeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create store:', error);
    throw error;
  }
};
export const updateStore = async (storeId, storeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`https://milk-delivery-api.onrender.com/api/stores/${storeId}`, storeData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};
export async function getStoreById(storeId) {
  const url = `https://milk-delivery-api.onrender.com/api/stores/${storeId}`;
  const token = localStorage.getItem('token')
  try {
      const response = await axios.get(url,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
  }
}
export async function updateStoreById(storeId, storeData) {
  const token = localStorage.getItem('token')
  const url = `https://milk-delivery-api.onrender.com/api/stores/${storeId}`;
  
  try {
      const response = await axios.put(url, storeData,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error updating store:', error);
      throw error;
  }
}
export async function deleteStoreById(storeId) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage.');
    throw new Error('Unauthorized');
  }

  const url = `https://milk-delivery-api.onrender.com/api/stores/${storeId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting store:', error);
    throw error;
  }
}