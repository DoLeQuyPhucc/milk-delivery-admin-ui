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
        totalPrice: 0,
        typeOfDelivery: '',
        numberOfShipment: 0,
        discount: 0,
        totalPriceDiscount: 0,
    });

    useEffect(() => {
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

    const handleDurationChange = (e) => {
        const duration = e.target.value;
        let numberOfShipment = 0;

        switch (duration) {
            case '1-WEEK':
                numberOfShipment = 3;
                break;
            case '1-MONTH':
                numberOfShipment = 12;
                break;
            case '2-MONTHS':
                numberOfShipment = 24;
                break;
            case '3-MONTHS':
                numberOfShipment = 36;
                break;
            case '6-MONTHS':
                numberOfShipment = 72;
                break;
            default:
                numberOfShipment = 0;
        }

        const totalPriceDiscount = formData.totalPrice - (formData.totalPrice * (formData.discount / 100));
        setFormData({ ...formData, typeOfDelivery: duration, numberOfShipment, totalPriceDiscount });
    };

    const handleDiscountChange = (e) => {
        const discount = parseFloat(e.target.value) || 0;
        let maxDiscount = 100; // Default max discount

        switch (formData.typeOfDelivery) {
            case '1-WEEK':
                maxDiscount = 5;
                break;
            case '1-MONTH':
                maxDiscount = 10;
                break;
            case '2-MONTHS':
                maxDiscount = 15;
                break;
            case '3-MONTHS':
                maxDiscount = 20;
                break;
            case '6-MONTHS':
                maxDiscount = 25;
                break;
            default:
                maxDiscount = 100;
        }

        if (discount > maxDiscount) {
            alert(`Discount for ${formData.typeOfDelivery} cannot exceed ${maxDiscount}%`);
            return;
        }

        const totalPriceDiscount = formData.totalPrice - (formData.totalPrice * (discount / 100));
        setFormData({ ...formData, discount, totalPriceDiscount });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clone formData and adjust the discount value
            const formDataToSend = {
                ...formData,
                discount: formData.discount / 100
            };
    
            const newPackage = await createPackage(formDataToSend);
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
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.products.map((product, index) => (
                                        <tr key={product.product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    value={product.quantity}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    required
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.product.price} VND
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProduct(index)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No products selected.</p>
                        )}
                    </div>
                </div>

                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="typeOfDelivery" className="block text-sm font-medium leading-6 text-gray-900">
                        Type of Delivery
                    </label>
                    <div className="mt-2">
                        <select
                            id="typeOfDelivery"
                            name="typeOfDelivery"
                            value={formData.typeOfDelivery}
                            onChange={handleDurationChange}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                        >
                            <option value="">Select a duration</option>
                            <option value="1-WEEK">1 Week</option>
                            <option value="1-MONTH">1 Month</option>
                            <option value="2-MONTHS">2 Months</option>
                            <option value="3-MONTHS">3 Months</option>
                            <option value="6-MONTHS">6 Months</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="numberOfShipment" className="block text-sm font-medium leading-6 text-gray-900">
                        Number of Shipments
                    </label>
                    <div className="mt-2">
                        <input
                            type="number"
                            name="numberOfShipment"
                            id="numberOfShipment"
                            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={formData.numberOfShipment}
                            readOnly
                        />
                    </div>
                </div>
                <div className="sm:col-span-6 mt-6">
                    <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                        Discount (%)
                    </label>
                    <div className="mt-2">
                        <input
                            id="discount"
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={handleDiscountChange}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-6 mt-6">
                    <p className="text-sm font-medium leading-6 text-gray-900">Total Amount: {formData.totalAmount}</p>
                    <p className="text-sm font-medium leading-6 text-gray-900">Total Price: {formData.totalPrice} VND</p>
                    <p className="text-sm font-medium leading-6 text-gray-900">Total Price after Discount: {formData.totalPriceDiscount} VND</p>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePackageForm;
