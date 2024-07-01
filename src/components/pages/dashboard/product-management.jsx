import React, { useState, useEffect } from 'react';
import { getAllProducts } from '@/data/ProductAPI';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@material-tailwind/react';
import CreateProductForm from '@/components/organisms/CreateModal/CreateProductForm';
import Modal from '@/components/organisms/Modal';

export function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <td className="font-semibold">
              <Button onClick={() => setIsModalOpen(true)}>Create Product</Button>
            </td>
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
                    <tr key={product.name}>
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
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            Edit
                          </Typography>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateProductForm />
      </Modal>
    </div>
  );
}

export default ProductManagement;
