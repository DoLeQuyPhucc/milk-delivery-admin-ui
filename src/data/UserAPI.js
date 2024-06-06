export const getAllUsers = async () => {
  try {
    const response = await fetch('https://testdb-fajc.onrender.com/allusers/getAllUsers', { 
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
