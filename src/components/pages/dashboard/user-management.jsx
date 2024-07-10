import React, { useState, useEffect } from 'react';
import { deleteUserById, getAllUsers } from '@/data/UserAPI';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from '@material-tailwind/react';
import CreateUserForm from '@/components/organisms/CreateModal/CreateUserForm';
import Modal from '@/components/organisms/Modal';
import EditUserModal from '@/components/organisms/EditModal/EditUserModal';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserById(userId);
        alert('User deleted successfully!');
        // After deletion, fetch users again to update the list
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {error ? (
        <div>Error fetching users: {error.message}</div>
      ) : (
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
            <Button onClick={() => setIsCreateModalOpen(true)}>Create User</Button>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['ID', 'Email', 'Role', 'Last Name', 'First Name', 'Action'].map((el) => (
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
                {users.map((user, key) => {
                  const className = `py-3 px-5 ${key === users.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                  return (
                    <tr key={user._id}>
                      <td className={className}>
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {user._id}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {user.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {user.role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {user.lastName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {user.firstName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Button
                          variant="text"
                          size="small"
                          className="mr-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-700"
                          onClick={() => handleEditClick(user._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          className="text-xs font-semibold text-white bg-red-500 hover:bg-red-700"
                          onClick={() => handleDeleteClick(user._id)}
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
      )}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateUserForm />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditUserModal userId={selectedUserId} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default UserManagement;
