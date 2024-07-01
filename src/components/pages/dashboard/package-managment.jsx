import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from '@material-tailwind/react';
import { deletePackageById, getAllPackages } from '@/data/PackageAPI';
import CreatePackageForm from '@/components/organisms/CreateModal/CreatePackageForm';
import EditPackageModal from '@/components/organisms/EditModal/EditPackageModal';
import Modal from '@/components/organisms/Modal';

function PackageManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await getAllPackages();
        setPackages(packages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleEditClick = (packageId) => {
    setSelectedPackageId(packageId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackageById(packageId);
        setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Failed to delete package. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Packages Table
          </Typography>
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Package</Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {['Package ID', 'Product Image', 'Product Name', 'Description', 'Quantity', 'Actions'].map((el) => (
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
              {packages.map((pkg) => (
                <React.Fragment key={pkg._id}>
                  {pkg.products.map((product, index) => {
                    const className = `py-3 px-5 ${index === pkg.products.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                    return (
                      <tr key={product._id}>
                        {index === 0 && (
                          <td className={className} rowSpan={pkg.products.length}>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {pkg._id}
                            </Typography>
                          </td>
                        )}
                        <td className={className}>
                          <Avatar
                            src={product.product.productImage}
                            alt={product.product.name}
                            size="sm"
                            className="font-semibold"
                          />
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            {product.product.name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="mr-2" style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            <span style={{ marginRight: '2px' }}>
                              {product.product.description}
                            </span>
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            {product.quantity}
                          </Typography>
                        </td>
                        {index === 0 && (
                          <td className={className} rowSpan={pkg.products.length}>
                            <div className="flex justify-center">
                              <Button className="mr-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700" onClick={() => handleEditClick(pkg._id)}>
                                Edit
                              </Button>
                              <Button className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700" onClick={() => handleDeleteClick(pkg._id)}>
                                Delete
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreatePackageForm />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditPackageModal packageId={selectedPackageId} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default PackageManagement;
