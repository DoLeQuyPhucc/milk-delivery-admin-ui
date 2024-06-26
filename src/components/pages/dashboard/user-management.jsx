import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/data/UserAPI';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from '@material-tailwind/react';
import CreateUserForm from '@/components/organisms/CreateModal/CreateUserForm';
import Modal from '@/components/organisms/Modal';



export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsers();
  }, []);

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
            <td className="font-semibold">
              <Button onClick={() => setIsModalOpen(true)}>Create User</Button>
            </td>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['ID', 'Email', 'Role', 'Last Name', 'First Name','Action'].map((el) => (
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
                          {user.userID}
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
        <CreateUserForm />
      </Modal>
    </div>
  );
}

export default UserManagement;
