import axios from "axios";

export async function getAllPackages() {
    const apiUrl = "https://milk-delivery-api.onrender.com/api/packages/getAllPackages";
    const token = localStorage.getItem("token");
    
    try {
        const response = await axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch packages:", error);
        throw error;
    }
    }
    export const createPackage = async (packageData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`https://milk-delivery-api.onrender.com/api/packages/`, packageData, {
            headers: {
                Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      };
      export const getPackageById = async (packageId) => {
        const token = localStorage.getItem('token')
        try {
          const response = await axios.get(`https://milk-delivery-api.onrender.com/api/packages/${packageId}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching package:', error);
          throw error;
        }
      };
      export const updatePackageById = async (packageId, packageData) => {
        const token = localStorage.getItem('token')
        try {
          const response = await axios.put(`https://milk-delivery-api.onrender.com/api/packages/${packageId}`, packageData,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          
          });
          return response.data;
        } catch (error) {
          console.error('Error updating package:', error);
          throw error;
        }
      };
      export const deletePackageById = async (packageId) => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage.');
          throw new Error('Unauthorized');
        }
      
        try {
          const response = await axios.delete(`https://milk-delivery-api.onrender.com/api/packages/${packageId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error deleting package:', error);
          throw error;
        }
      };
      