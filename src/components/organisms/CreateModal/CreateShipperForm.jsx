import { createShipper } from '@/data/ShipperAPI';
import React, { useState, useEffect } from 'react';
import { getAllStores } from '@/data/StoreAPI';

function CreateShipperForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    avataImage: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    shipperName: '',
    role:'SHIPPER'
  });

  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getAllStores();
        if (response && Array.isArray(response)) {
          setStores(response);
        } else {
          console.error('Empty response or missing data:', response);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
        setError('Failed to fetch stores.');
      }
    };

    fetchStores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newShipper = await createShipper({
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        avataImage: formData.avataImage,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        address: formData.address,
        shipperName: formData.shipperName,
        role: formData.role
      });
      console.log('Shipper created:', newShipper);
      alert('Shipper created successfully!');
      // Handle state update for newly created shipper if needed
      // setShippers([...shippers, newShipper]);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create shipper:', error);
      alert('Error creating shipper. Please try again.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Shipper Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Enter the shipper details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='sm:col-span-3'>
            <label htmlFor='userName' className='block text-sm font-medium leading-6 text-gray-900'>
              User Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='userName'
                id='userName'
                autoComplete='username'
                className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={handleChange}
              />
              </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="avataImage" className="block text-sm font-medium leading-6 text-gray-900">
              Avatar Image URL
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="avataImage"
                id="avataImage"
                autoComplete="url"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
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
                type="text"
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="shipperName" className="block text-sm font-medium leading-6 text-gray-900">
              Shipper Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="shipperName"
                id="shipperName"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
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
            Create Shipper
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateShipperForm;
