import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStoreById, updateStoreById } from '@/data/StoreAPI';

function EditStoreModal({ storeId, onClose }) {
  const [formData, setFormData] = useState({
    storeName: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await getStoreById(storeId);
        setFormData(storeData);
      } catch (error) {
        console.error('Failed to fetch store:', error);
        alert('Error fetching store. Please try again.');
      }
    };

    fetchStore();
  }, [storeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedStore = await updateStoreById(storeId, formData);
      console.log('Store updated:', updatedStore);
      alert('Store updated successfully!');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to update store:', error);
      alert('Error updating store. Please try again.');
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Store Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Update the store details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="storeName" className="block text-sm font-medium leading-6 text-gray-900">
              Store Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="storeName"
                id="storeName"
                autoComplete="store-name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.storeName}
                required
              />
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
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.address}
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
                value={formData.phone}
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
            Update Store
          </button>
        </div>
      </form>
    </div>
  );
}

EditStoreModal.propTypes = {
  storeId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditStoreModal;
