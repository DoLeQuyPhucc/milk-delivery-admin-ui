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

export const LogIn = async (email, password) => {
  // Logic to fetch user data and token
  const response = await fetch('https://milk-delivery-api.onrender.com/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials. Please try again.');
  }

  const data = await response.json();
  return {
    user: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      avatarImage: data.avatarImage,
    },
    token: data.token,
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




