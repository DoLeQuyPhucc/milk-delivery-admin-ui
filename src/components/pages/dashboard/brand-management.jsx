import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react';
import { getAllBrands, deleteBrand } from '@/data/BrandAPI';
import Modal from '@/components/organisms/Modal';
import CreateBrandForm from '@/components/organisms/CreateModal/CreateBrandForm';
import EditBrandModal from '@/components/organisms/EditModal/EditBrandModal';


function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandData = await getAllBrands();
        console.log('Fetched brands:', brandData); // Debug: Log fetched brands
        setBrands(brandData);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async (brandId) => {
    console.log('Deleting brand with ID:', brandId);
    if (window.confirm('Are you sure you want to delete this store?')) {// Check if brandId is defined
      try {
        await deleteBrand(brandId);
        alert('Brand deleted successfully!');
        setBrands(brands.filter(brand => brand._id !== brandId));
      } catch (error) {
        console.error(`Failed to delete brand with ID ${brandId}:`, error.message);
        alert('Error deleting brand. Please try again.');
      }
    }
  };

  const handleEdit = (brandId) => {
    const brandToEdit = brands.find(brand => brand._id === brandId);
    setEditingBrand(brandToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBrand(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Brands Table
          </Typography>
          <td className="font-semibold">
            <Button onClick={() => setIsModalOpen(true)}>Create Brand</Button>
          </td>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loading ? (
            <Typography variant="small" className="text-center">
              Loading...
            </Typography>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Email", "Address", "Phone", "Actions"].map((el) => (
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
                {brands.map((brand) => (
                  <tr key={brand._id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {brand.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {brand.email}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {brand.address}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {brand.phone}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Button
                        className="mr-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700"
                        onClick={() => handleEdit(brand._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700"
                        onClick={() => handleDelete(brand._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingBrand ? (
          <EditBrandModal
            brandId={editingBrand._id}
            onCloseModal={handleCloseModal}
          />
        ) : (
          <CreateBrandForm onCloseModal={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
}

export default BrandManagement;
