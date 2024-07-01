import axios from "axios";

export const getAllBrands = async () => {
    const apiUrl = 'https://milk-delivery-api.onrender.com/api/brands/getAllBrands';
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      throw error;
    }
  };
 export const getBrandById = async (brandId) => {
    const token = localStorage.getItem('token');
    const url = `https://milk-delivery-api.onrender.com/api/brands/${brandId}`;

    try {
        const response = await axios.get(url,{
            headers: {   
              'Authorization': `Bearer ${token}`
            }
        });
        return response.data; // Assuming the API returns the brand data
    } catch (error) {
        throw Error(`Failed to fetch brand with ID ${brandId}: ${error.message}`);
    }
};

export const createBrand = async (brandData) => {
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/brands';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(apiUrl, brandData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create brand:', error);
    throw error;
  }
};

export const deleteBrand = async (brandId) => {
  const url = `https://milk-delivery-api.onrender.com/api/brands/${brandId}`;
  const token = localStorage.getItem('token')
  try {
      const response = await axios.delete(url,{
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data; // Assuming the API returns some confirmation data upon successful deletion
  } catch (error) {
      throw Error(`Failed to delete brand with ID ${brandId}: ${error.message}`);
  }
};
 export const updateBrand = async (brandId, updatedBrandData) => {
  const apiUrl = `https://milk-delivery-api.onrender.com/api/brands/${brandId}`;
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(apiUrl, updatedBrandData,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data; // Assuming the API returns updated brand data or a success message
  } catch (error) {
    throw new Error(`Failed to update brand with ID ${brandId}: ${error.message}`);
  }
};


