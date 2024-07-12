import axios from 'axios';

export async function getAllUsers() {
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/users/getAllUsers';
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}
getAllUsers().then(users => {
  console.log(users);
}).catch(error => {
  console.error('Error fetching users:', error);
});

export const LogIn = async (userName, password) => {
  // Logic to fetch user data and token
  const response = await fetch('https://milk-delivery-api.onrender.com/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials. Please try again.');
  }

  const data = await response.json();
  return {
    token: data.accessToken,
    refreshToken: data.refreshToken
  };
};
export const createUser = async (userData) => {
  const token = localStorage.getItem('token');
  const apiUrl = 'https://milk-delivery-api.onrender.com/api/users/';

  try {
    const response = await axios.post(apiUrl, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};
export const getUserById = async (userId) => {
  const token = localStorage.getItem('token');
  try {
    const url = `https://milk-delivery-api.onrender.com/api/users/getUserById/${userId}`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Check if the response is OK
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user information');
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
};
export const updateUserById = async (userId, userData) => {
  const token = localStorage.getItem('token');
  try {
    const url = `https://milk-delivery-api.onrender.com/api/users/${userId}`;
    const response = await axios.put(url, userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the response is OK
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user information');
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    throw error;
  }
};
export const deleteUserById = async (userId) => {
  const token = localStorage.getItem('token');
  try {
    const url = `https://milk-delivery-api.onrender.com/api/users/getUserById/${userId}`;
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Check if the response is OK
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update user information');
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    throw error;
  }
};



