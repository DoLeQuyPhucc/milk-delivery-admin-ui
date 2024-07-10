import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProductById } from '@/data/ProductAPI';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from '@material-tailwind/react';
import CreateProductForm from '@/components/organisms/CreateModal/CreateProductForm';
import EditProductModal from '@/components/organisms/EditModal/EditProductModal'; // Adjust the import path
import Modal from '@/components/organisms/Modal';

export function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        setError(error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await deleteProductById(productId);
        setProducts(products.filter((product) => product._id !== productId));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {error ? (
        <div>Error fetching products: {error.message}</div>
      ) : (
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
            <Typography variant="h6" color="white">
              Products Table
            </Typography>
            <Button onClick={() => setIsCreateModalOpen(true)}>Create Product</Button>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['Name', 'Image', 'Description', 'Price', 'Stock Quantity', 'Action'].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, key) => {
                  const className = `py-3 px-5 ${key === products.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                  return (
                    <tr key={product._id}>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {product.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Avatar src={product.productImage} alt={product.name} size="sm" variant="rounded" />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {product.description}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {product.price.toLocaleString()} VND
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {product.stockQuantity}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="text"
                            size="small"
                            className="text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700"
                            onClick={() => handleEditClick(product._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700"
                            onClick={() => handleDeleteClick(product._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateProductForm onClose={() => setIsEditModalOpen(false)}/>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProductModal productId={selectedProductId} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default ProductManagement;
