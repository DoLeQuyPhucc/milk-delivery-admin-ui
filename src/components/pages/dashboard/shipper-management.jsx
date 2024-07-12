import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@material-tailwind/react";
import CreateShipperForm from '@/components/organisms/CreateModal/CreateShipperForm';
import Modal from '@/components/organisms/Modal';
import { deleteShipperById, getAllShippers } from '@/data/ShipperAPI';
import EditShipperModal from '@/components/organisms/EditModal/EditShipperModal';
import { getAllStores } from '@/data/StoreAPI'; // Import getAllStores function

export function ShipperManagement() {
  const [shippers, setShippers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShipperId, setSelectedShipperId] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState({});

  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const response = await getAllShippers();
        setShippers(response); // Assuming response directly returns an array of shippers
      } catch (error) {
        console.error('Error fetching shippers:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await getAllStores();
        setStores(response); // Assuming response directly returns an array of stores
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchShippers();
    fetchStores();
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

  const handleStoreChange = (shipperId, event) => {
    const selectedStoreID = event.target.value;
    setSelectedStoreId({ [shipperId]: selectedStoreID });
    // Update the selected store ID for the shipper in your state or API
    console.log(`Selected store ID for shipper ${shipperId}:`, selectedStoreID);
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
          <Button onClick={() => setIsCreateModalOpen(true)}>Create Shipper</Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Phone", "Action"].map((el) => (
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
          <EditShipperModal shipperId={selectedShipperId} onClose={() => setIsEditModalOpen(false)} />
        )}
      </Modal>
    </div>
  );
}

export default ShipperManagement;
