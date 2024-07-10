import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getBrandById, updateBrand } from '@/data/BrandAPI';

function EditBrandModal({ brandId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const fetchBrand = async () => {
      if (!brandId) return; // Handle the case where brandId is undefined
      try {
        const brandData = await getBrandById(brandId);
        setFormData({
          name: brandData.name,
          email: brandData.email,
          address: brandData.address,
          phone: brandData.phone,
        });
      } catch (error) {
        console.error('Failed to fetch brand:', error);
        // Handle error fetching brand data
      }
    };
  
    fetchBrand();
  }, [brandId]); // Dependency array ensures useEffect runs when brandId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBrand(brandId, formData);
      console.log('Brand updated successfully!');
      alert('Brand updated successfully!');
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to update brand:', error);
      alert('Error updating brand. Please try again.');
    }
  };

  // Ensure the form renders properly with the initial formData
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Update Brand</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Update the brand details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Brand Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.email}
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
            Update Brand
          </button>
        </div>
      </form>
    </div>
  );
}

EditBrandModal.propTypes = {
  brandId: PropTypes.string.isRequired, // Ensure brandId is a required string prop
};

export default EditBrandModal;
