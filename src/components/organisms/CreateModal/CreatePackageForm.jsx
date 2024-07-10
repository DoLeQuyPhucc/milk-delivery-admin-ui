import React, { useState, useEffect } from 'react';
import { createPackage } from '@/data/PackageAPI';
import { getAllProducts } from '@/data/ProductAPI';
import { getAllBrands } from '@/data/BrandAPI';

function CreatePackageForm() {
    const [brands, setBrands] = useState([]);
    const [selectedBrandID, setSelectedBrandID] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        products: [],
        totalAmount: 0,
        totalPrice: 0
    });

    useEffect(() => {
        // Fetch available brands and all products
        const fetchData = async () => {
            try {
                const brandsData = await getAllBrands();
                setBrands(brandsData);

                const productsData = await getAllProducts();
                setAllProducts(productsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter products based on selected brand ID
        if (selectedBrandID) {
            const filtered = allProducts.filter(product => product.brandID === selectedBrandID);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [selectedBrandID, allProducts]);

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

    const handleAddProduct = (product) => {
        const updatedProducts = [
            ...formData.products,
            { product, quantity: '' }
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
                <div className="sm:col-span-6">
                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                        Select Brand
                    </label>
                    <div className="mt-2">
                        <select
                            id="brand"
                            name="brand"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={selectedBrandID}
                            onChange={(e) => setSelectedBrandID(e.target.value)}
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

                {selectedBrandID && (
                    <div className="sm:col-span-6 mt-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Select
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product 
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
                                                onChange={() => handleAddProduct(product)}
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
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Selected Products</h3>
                    <div className="mt-2">
                        {formData.products.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.products.map((product, index) => (
                                        <tr key={product.product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={product.quantity}
                                                    onChange={(e) => handleChange(e, index)}
                                                    required
                                                    min={1}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    onClick={() => handleRemoveProduct(index)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-sm text-gray-500">No products added yet.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center sm:col-span-6 mt-6">
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
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Create Package
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePackageForm;
