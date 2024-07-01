import { createProduct } from '@/data/ProductAPI';
import React, { useState } from 'react';

function CreateProductForm() {
  const [formData, setFormData] = useState({
    brandID: '',
    name: '',
    productImage: '',
    description: '',
    price: 0,
    stockQuantity: 0
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = await createProduct(formData);
      console.log('Product created:', newProduct);
      alert('Product created successfully!');
      setProducts([...products, newProduct]);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">Enter the product details below.</p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="brandID" className="block text-sm font-medium leading-6 text-gray-900">
              Brand ID
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="brandID"
                id="brandID"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
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
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="productImage" className="block text-sm font-medium leading-6 text-gray-900">
              Product Image URL
            </label>
            <div className="mt-2">
              <input
                type="url"
                name="productImage"
                id="productImage"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
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
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
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
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
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
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
