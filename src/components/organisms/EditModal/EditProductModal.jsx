import React, { useState, useEffect } from 'react';
import { getProductById, updateProductById } from '@/data/ProductAPI'; // Adjust the import path as needed
import { getAllBrands } from '@/data/BrandAPI'; // Adjust the import path as needed

function EditProductModal({ productId, onClose }) {
  const [formData, setFormData] = useState({
    brandID: '', // Changed from 'brandID' to match the state property
    name: '',
    productImage: '',
    description: '',
    price: 0,
    stockQuantity: 0,
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, brands] = await Promise.all([getProductById(productId), getAllBrands()]);
        setFormData({
          brandID: product.brandID._id, // Store brand ID to match with dropdown values
          name: product.name,
          productImage: product.productImage,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
        });
        setBrands(brands);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData with the selected value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProductById(productId, formData);
      console.log('Product updated:', formData);
      alert('Product updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Product Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Update the product details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="brandID" className="block text-sm font-medium leading-6 text-gray-900">
              Brand
            </label>
            <div className="mt-2">
              <select
                name="brandID" // Changed from 'brand' to match the state property
                id="brandID"
                value={formData.brandID}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              >
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Product Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="productImage" className="block text-sm font-medium leading-6 text-gray-900">
              Product Image URL
            </label>
            <div className="mt-2">
              <textarea
                type="url"
                name="productImage"
                id="productImage"
                value={formData.productImage}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              ></textarea>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="stockQuantity" className="block text-sm font-medium leading-6 text-gray-900">
              Stock Quantity
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="stockQuantity"
                id="stockQuantity"
                value={formData.stockQuantity}
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductModal;
