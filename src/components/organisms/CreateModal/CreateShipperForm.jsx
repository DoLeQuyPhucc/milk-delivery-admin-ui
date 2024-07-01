import { createShipper } from '@/data/ShipperAPI';
import React, { useState } from 'react';

function CreateShipperForm() {
  const [formData, setFormData] = useState({
    shipperName: '',
    phone: '',
    storeID: '',
  });

  const [shippers, setShippers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newShipper = await createShipper({
        shipperName: formData.shipperName,
        phone: formData.phone,
        store: {
          storeID: formData.storeID,
        },
      });
      console.log('Shipper created:', newShipper);
      alert('Shipper created successfully!');
      setShippers([...shippers, newShipper]);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create shipper:', error);
      alert('Error creating shipper. Please try again.');
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Shipper Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Enter the shipper details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="shipperName" className="block text-sm font-medium leading-6 text-gray-900">
              Shipper Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="shipperName"
                id="shipperName"
                autoComplete="shipper-name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="storeID" className="block text-sm font-medium leading-6 text-gray-900">
              Store ID
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="storeID"
                id="storeID"
                autoComplete="store-id"
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
