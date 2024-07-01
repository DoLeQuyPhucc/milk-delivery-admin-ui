import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from '@material-tailwind/react';
import { getAllStores, deleteStoreById } from '@/data/StoreAPI';
import CreateStoreForm from '@/components/organisms/CreateModal/CreateStoreForm';
import EditStoreForm from '@/components/organisms/EditModal/EditStoreModal';
import Modal from '@/components/organisms/Modal';

function StoreManagement() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStoreId, setEditStoreId] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeData = await getAllStores();
        setStores(storeData);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleEdit = (storeId) => {
    setEditStoreId(storeId);
    setIsModalOpen(true);
  };

  const handleDelete = async (storeId) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStoreById(storeId);
        setStores((prevStores) => prevStores.filter((store) => store._id !== storeId));
      } catch (error) {
        console.error('Error deleting store:', error);
        alert('Failed to delete store. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditStoreId(null);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Stores Table
          </Typography>
          <td className="font-semibold">
            <Button onClick={() => setIsModalOpen(true)}>Create Store</Button>
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
                  {["Store Name", "Address", "Phone", "Actions"].map((el) => (
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
                {stores.map((store, key) => {
                  const className = `py-3 px-5 ${
                    key === stores.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={store._id}>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {store.storeName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {store.address}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {store.phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          className="mr-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700"
                          onClick={() => handleEdit(store._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(store._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editStoreId ? (
          <EditStoreForm storeId={editStoreId} onClose={handleCloseModal} />
        ) : (
          <CreateStoreForm />
        )}
      </Modal>
    </div>
  );
}

export default StoreManagement;
