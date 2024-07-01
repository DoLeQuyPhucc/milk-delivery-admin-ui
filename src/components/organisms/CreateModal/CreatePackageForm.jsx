import React, { useState } from 'react';
import { createPackage } from '@/data/PackageAPI';
import { Input } from '@material-tailwind/react';

function CreatePackageForm() {
    const [formData, setFormData] = useState({
        products: [
            { product: { name: '', brandID: '', productImage: '', description: '', price: '', stockQuantity: '' }, quantity: '' }
        ],
        totalAmount: 0,
        totalPrice: 0
    });

    const calculateTotals = (products) => {
        let totalAmount = 0;
        let totalPrice = 0;

        products.forEach(product => {
            const quantity = parseInt(product.quantity) || 0;
            const price = parseFloat(product.product.price) || 0;
            totalAmount += quantity;
            totalPrice += quantity * price;
        });

        return { totalAmount, totalPrice };
    };

    const handleChange = (e, index, productField = null) => {
        const { name, value } = e.target;
        let updatedProducts;

        if (productField !== null) {
            updatedProducts = formData.products.map((product, idx) => {
                if (idx === index) {
                    return {
                        ...product,
                        product: {
                            ...product.product,
                            [productField]: value
                        }
                    };
                }
                return product;
            });
        } else {
            updatedProducts = formData.products.map((product, idx) => {
                if (idx === index) {
                    return {
                        ...product,
                        [name]: value
                    };
                }
                return product;
            });
        }

        const { totalAmount, totalPrice } = calculateTotals(updatedProducts);
        setFormData({ ...formData, products: updatedProducts, totalAmount, totalPrice });
    };

    const handleAddProduct = () => {
        const updatedProducts = [
            ...formData.products,
            { product: { name: '', brandID: '', productImage: '', description: '', price: '', stockQuantity: '' }, quantity: '' }
        ];
        const { totalAmount, totalPrice } = calculateTotals(updatedProducts);
        setFormData({ ...formData, products: updatedProducts, totalAmount, totalPrice });
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = formData.products.filter((_, idx) => idx !== index);
        const { totalAmount, totalPrice } = calculateTotals(updatedProducts);
        setFormData({ ...formData, products: updatedProducts, totalAmount, totalPrice });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPackage = await createPackage(formData);
            console.log('Package created:', newPackage);
            alert('Package created successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Failed to create package:', error);
            alert('Error creating package. Please try again.');
        }
    };

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Package</h2>

            <form onSubmit={handleSubmit}>
                {formData.products.map((product, index) => (
                    <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor={`product-name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="productName"
                                    id={`product-name-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.name}
                                    onChange={(e) => handleChange(e, index, 'name')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor={`product-brandID-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Brand ID
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="productBrandID"
                                    id={`product-brandID-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.brandID}
                                    onChange={(e) => handleChange(e, index, 'brandID')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor={`product-image-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Product Image URL
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    name="productImage"
                                    id={`product-image-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.productImage}
                                    onChange={(e) => handleChange(e, index, 'productImage')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor={`product-description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Product Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="productDescription"
                                    id={`product-description-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.description}
                                    onChange={(e) => handleChange(e, index, 'description')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`product-price-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Product Price
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="productPrice"
                                    id={`product-price-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.price}
                                    onChange={(e) => handleChange(e, index, 'price')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`product-stockQuantity-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Stock Quantity
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="productStockQuantity"
                                    id={`product-stockQuantity-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.product.stockQuantity}
                                    onChange={(e) => handleChange(e, index, 'stockQuantity')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Quantity
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="quantity"
                                    id={`quantity-${index}`}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={product.quantity}
                                    onChange={(e) => handleChange(e, index)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => handleRemoveProduct(index)}
                            >
                                Remove Product
                            </button>
                        </div>
                    </div>
                ))}

                <div className="sm:col-span-6">
                    <button
                        type="button"
                        className="mt-5 mb-5 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleAddProduct}
                    >
                        Add Another Product
                    </button>
                </div>
                <div className="flex justify-between items-center sm:col-span-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="totalAmount" className="block text-sm font-medium leading-6 text-gray-900">
                            Total Amount
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="totalAmount"
                                id="totalAmount"
                                className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={formData.totalAmount}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="totalPrice" className="block text-sm font-medium leading-6 text-gray-900">
                            Total Price
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="totalPrice"
                                id="totalPrice"
                                className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={formData.totalPrice}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Package
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePackageForm;
