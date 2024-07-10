// EditShipperModal.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getShipperById, updateShipperById } from '@/data/ShipperAPI';
import { getAllStores } from '@/data/StoreAPI';

function EditShipperModal({ shipperId, onClose }) {
  const [formData, setFormData] = useState({
    shipperName: '',
    phone: '',
    store: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipperData = await getShipperById(shipperId);
        setFormData({
          shipperName: shipperData.shipperName,
          phone: shipperData.phone,
          store: shipperData.store ? shipperData.store.storeID : ''
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch shipper information.');
        setLoading(false);
      }
    };

    fetchData();
  }, [shipperId]);

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
      await updateShipperById(shipperId, {
        shipperName: formData.shipperName,
        phone: formData.phone,
        store: { storeID: formData.store }
      });
      alert('Shipper updated successfully!');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Failed to update shipper:', error);
      alert('Error updating shipper. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Shipper Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Update the shipper details below.</p>

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
                value={formData.shipperName}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
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

          <div className="sm:col-span-3">
            <label htmlFor="store" className="block text-sm font-medium leading-6 text-gray-900">
              Store
            </label>
            <div className="mt-2">
              <select
                id="store"
                name="store"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.store}
                required
              >
                <option value="">Select a store</option>
                {stores && stores.length > 0 && stores.map(store => (
                  <option key={store._id} value={store._id}>
                    {store.storeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Shipper
          </button>
        </div>
      </form>
    </div>
  );
}

EditShipperModal.propTypes = {
  shipperId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditShipperModal;
