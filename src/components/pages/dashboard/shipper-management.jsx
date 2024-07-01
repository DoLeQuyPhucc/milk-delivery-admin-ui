import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import CreateShipperForm from '@/components/organisms/CreateModal/CreateShipperForm';
import EditShipperForm from '@/components/organisms/EditModal/EditShipperForm';
import Modal from '@/components/organisms/Modal';
import { deleteShipperById } from '@/data/ShipperAPI';

export function ShipperManagement() {
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShipperId, setSelectedShipperId] = useState(null);

  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const response = await axios.get('https://milk-delivery-api.onrender.com/api/shippers/getAllShippers');
        setShippers(response.data);
      } catch (error) {
        console.error('Error fetching shippers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippers();
  }, []);

  const openEditModal = (shipperId) => {
    setSelectedShipperId(shipperId);
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = async (shipperId) => {
    if (window.confirm('Are you sure you want to delete this shipper?')) {
      try {
        await deleteShipperById(shipperId);
        setShippers((prevShippers) => prevShippers.filter(shipper => shipper._id !== shipperId));
      } catch (error) {
        console.error('Error deleting shipper:', error);
        alert('Failed to delete shipper. Please try again.');
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!shippers || shippers.length === 0) {
    return <Typography>No shippers available</Typography>;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Shippers Table
          </Typography>
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Store</Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Phone", "Store ID", "Action"].map((el) => (
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
              {shippers.map(({ _id, shipperName, phone, store }, key) => {
                const className = `py-3 px-5 ${key === shippers.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr key={_id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {shipperName}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {store.storeID}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button
                        as="a"
                        href="#"
                        className="mr-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700"
                        onClick={() => openEditModal(_id)}
                      >
                        Edit
                      </Button>
                      <Button
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700"
                        onClick={() => handleDeleteClick(_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateShipperForm />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {selectedShipperId && (
          <EditShipperForm shipperId={selectedShipperId} onClose={() => setIsEditModalOpen(false)} />
        )}
      </Modal>
    </div>
  );
}

export default ShipperManagement;
