import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPackageById, updatePackageById } from '@/data/PackageAPI';
import { getAllBrands } from '@/data/BrandAPI';

function EditPackageModal({ packageId, onClose }) {
    const [formData, setFormData] = useState({
        products: [],
        totalAmount: 0,
        totalPrice: 0
    });
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchPackage = async () => {
            if (!packageId) return;
            try {
                const packageData = await getPackageById(packageId);
                setFormData({
                    products: packageData.products,
                    totalAmount: packageData.totalAmount,
                    totalPrice: packageData.totalPrice
                });
            } catch (error) {
                console.error('Failed to fetch package:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const brandsData = await getAllBrands();
                setBrands(brandsData);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        fetchPackage();
        fetchBrands();
    }, [packageId]);

    useEffect(() => {
        const calculateTotals = () => {
            const totalAmount = formData.products.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
            const totalPrice = formData.products.reduce((sum, item) => sum + ((parseFloat(item.product.price) || 0) * (parseInt(item.quantity) || 0)), 0);
            setFormData(prevFormData => ({
                ...prevFormData,
                totalAmount,
                totalPrice
            }));
        };

        calculateTotals();
    }, [formData.products]);

    const handleChange = (e, index, field) => {
        const { name, value } = e.target;
        const newProducts = [...formData.products];
        if (field) {
            newProducts[index].product[field] = value;
        } else {
            newProducts[index][name] = value;
        }
        setFormData({ ...formData, products: newProducts });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePackageById(packageId, formData);
            console.log('Package updated successfully!');
            alert('Package updated successfully!');
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Failed to update package:', error);
            alert('Error updating package. Please try again.');
        }
    };

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Update Package</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Update the package details below.</p>

            <form onSubmit={handleSubmit}>
                {formData.products.map((item, index) => (
                    <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor={`name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id={`name-${index}`}
                                    autoComplete="name"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e, index, 'name')}
                                    value={item.product.name}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor={`description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    id={`description-${index}`}
                                    name="description"
                                    type="text"
                                    autoComplete="description"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e, index, 'description')}
                                    value={item.product.description}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`price-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    id={`price-${index}`}
                                    name="price"
                                    type="number"
                                    autoComplete="price"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e, index, 'price')}
                                    value={item.product.price}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`quantity-${index}`} className=" block text-sm font-medium leading-6 text-gray-900">
                                Quantity
                            </label>
                            <div className="mt-2">
                                <input
                                    id={`quantity-${index}`}
                                    name="quantity"
                                    type="number"
                                    autoComplete="quantity"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e, index)}
                                    value={item.quantity}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={`brand-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    id={`brand-${index}`}
                                    name="brand"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e, index, 'brandID')}
                                    value={item.product.brandID || ''}
                                    required
                                >
                                    <option value="">Select a brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="my-4 border-t border-black"></div>
                <div className="flex space-x-4">
                    <div className="sm:col-span-2">
                        <label htmlFor="totalAmount" className=" mt-3 block text-sm font-medium leading-6 text-gray-900">
                            Total Amount
                        </label>
                        <div className="mt-2">
                            <input
                                id="totalAmount"
                                name="totalAmount"
                                type="number"
                                autoComplete="totalAmount"
                                className=" rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleFormChange}
                                value={formData.totalAmount}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="totalPrice" className=" mt-3 block text-sm font-medium leading-6 text-gray-900">
                            Total Price
                        </label>
                        <div className="mt-2">
                            <input
                                id="totalPrice"
                                name="totalPrice"
                                type="number"
                                autoComplete="totalPrice"
                                className="block rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleFormChange}
                                value={formData.totalPrice}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Package
                    </button>
                </div>
            </form>
        </div>
    );
}

EditPackageModal.propTypes = {
    packageId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditPackageModal;
