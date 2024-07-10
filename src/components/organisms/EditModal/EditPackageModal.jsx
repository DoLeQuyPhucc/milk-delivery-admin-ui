import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPackageById, updatePackageById } from '@/data/PackageAPI';
import { getAllProducts } from '@/data/ProductAPI';
import { getAllBrands } from '@/data/BrandAPI';

function EditPackageModal({ packageId, onClose }) {
    const [formData, setFormData] = useState({
        products: [],
        totalAmount: 0,
        totalPrice: 0
    });
    const [brands, setBrands] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        const fetchPackage = async () => {
            if (!packageId) return;
            try {
                const packageData = await getPackageById(packageId);
                if (!packageData) {
                    console.error('Package data not found.');
                    return;
                }
                setFormData({
                    products: packageData.products.map(product => ({
                        product: {
                            ...product.product,
                            price: parseFloat(product.product.price).toFixed(2),
                            brandID: product.product.brandID ? product.product.brandID._id : ''
                        },
                        quantity: product.quantity,
                        isSelected: false // Ensure isSelected is initialized
                    })),
                    totalAmount: packageData.totalAmount,
                    totalPrice: parseFloat(packageData.totalPrice).toFixed(2)
                });
            } catch (error) {
                console.error('Failed to fetch package:', error);
            }
        };

        const fetchBrandsAndProducts = async () => {
            try {
                const brandsData = await getAllBrands();
                setBrands(brandsData);

                const productsData = await getAllProducts();
                setAllProducts(productsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchPackage();
        fetchBrandsAndProducts();
    }, [packageId]);

    useEffect(() => {
        if (formData.products.length > 0) {
            // Filter products based on the brands of existing products in the package
            const brandIDs = new Set(formData.products.map(item => item.product.brandID));
            const filtered = allProducts.filter(product => brandIDs.has(product.brandID));
            setFilteredProducts(filtered);
        }
    }, [formData.products, allProducts]);

    const handleChange = (isChecked, product) => {
        // Check if the product already exists in formData.products
        const productExists = formData.products.some(p => p.product._id === product._id);
    
        if (isChecked && !productExists) {
            // Add the product from filteredProducts to formData.products
            const updatedProducts = [
                ...formData.products,
                {
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        brandID: product.brandID
                    },
                    quantity: 0, // You can initialize quantity as needed
                    isSelected: true
                }
            ];
    
            setFormData(prevFormData => ({
                ...prevFormData,
                products: updatedProducts
            }));
        } else if (!isChecked && productExists) {
            // Remove the product from formData.products if unchecked
            const updatedProducts = formData.products.filter(p => p.product._id !== product._id);
    
            setFormData(prevFormData => ({
                ...prevFormData,
                products: updatedProducts
            }));
        }
    };

    const handleDelete = (productId) => {
        const newProducts = formData.products.filter(item => item.product._id !== productId);
        setFormData({ ...formData, products: newProducts });
    };

    const handleQuantityChange = (e, product) => {
        const updatedProducts = formData.products.map((p) => {
            if (p.product._id === product.product._id) {
                return {
                    ...p,
                    quantity: parseInt(e.target.value, 10) || 0
                };
            }
            return p;
        });

        setFormData({
            ...formData,
            products: updatedProducts
        });
    };

    const calculateTotals = () => {
        const totalAmount = formData.products.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = formData.products.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);
        setFormData(prevFormData => ({
            ...prevFormData,
            totalAmount,
            totalPrice: totalPrice.toFixed(2)
        }));
    };

    useEffect(() => {
        calculateTotals();
    }, [formData.products]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updatePackageById(packageId, formData);
            console.log('Package updated successfully!');
            alert('Package updated successfully!');
            onClose();
            // You may consider more targeted state updates instead of a full reload
            window.location.reload(); // Refreshing the page can be replaced with more targeted state updates if desired
        } catch (error) {
            console.error('Failed to update package:', error);
            alert('Error updating package. Please try again.');
        }
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        // Filter products based on selected brand
        const filtered = allProducts.filter(product => product.brandID === e.target.value);
        setFilteredProducts(filtered);
    };

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Update Package</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Update the package details below.</p>

            <form onSubmit={handleSubmit}>
                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Brand
                    </label>
                    <select
                        id="brand"
                        name="brand"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    >
                        <option value="">Select a brand...</option>
                        {brands.map(brand => (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                </div>

                {filteredProducts.length > 0 && (
                    <div className="sm:col-span-6 mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Select
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={product.isSelected}
                                                onChange={(e) => handleChange(e.target.checked, product)}
                                            />


                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.price} VND
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="sm:col-span-6 mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.products.map(product => (
                                <tr key={product.product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap md:w-2/3">
                                        {product.product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="number"
                                            min="1"
                                            name="quantity"
                                            value={product.quantity}
                                            onChange={(e) => handleQuantityChange(e, product)}
                                            className="w-20 border-gray-300 rounded-md shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(product.product._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="totalAmount" className="block text-sm font-medium leading-6 text-gray-900">
                        Total Amount
                    </label>
                    <input
                        id="totalAmount"
                        type="text"
                        name="totalAmount"
                        value={formData.totalAmount}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="totalPrice" className="block text-sm font-medium leading-6 text-gray-900">
                        Total Price
                    </label>
                    <input
                        id="totalPrice"
                        type="text"
                        name="totalPrice"
                        value={formData.totalPrice}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="sm:col-span-6 mt-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    onClose: PropTypes.func.isRequired
};

export default EditPackageModal;
