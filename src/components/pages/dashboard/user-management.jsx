// UserManagement.js
import { getAllUsers } from '@/data/UserAPI';
import React, { useState, useEffect } from 'react';


export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers
        ();
        setUsers(users);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.firstName} {user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
