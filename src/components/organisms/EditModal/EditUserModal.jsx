import React, { useState, useEffect } from 'react';
import { updateUserById, getUserById } from '@/data/UserAPI';

function EditUserModal({ userId, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    avatarImage: '',
    phoneNumber: '',
    role: 'USER',
    address: '',
    password: '', // Consider if you want to include this in editing
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userId);
        if (user) {
          setFormData({
            email: user.email || '',
            username: user.username || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            avatarImage: user.avatarImage || '',
            phoneNumber: user.phoneNumber || '',
            role: user.role || 'USER',
            address: user.address || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUserById(userId, formData);
      console.log('User updated:', updatedUser);
      alert('User updated successfully!');
      onClose(); // Close modal upon successful update
      window.location.reload();
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Error updating user. Please try again.');
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Edit User Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Update the user's details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3" hidden>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"   
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
              Role
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserModal;
