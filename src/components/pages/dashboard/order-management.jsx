import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { getAllOrders } from "@/data/OrderAPI";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Orders Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Total Amount", "Total Price", "Status", "Payment Method", "User", "Delivered At"].map((el) => (
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
              {orders.map((order, key) => {
                const className = `py-3 px-5 ${
                  key === orders.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={order._id}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order._id}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order.package.totalAmount}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order.package.totalPrice}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={order.status === "Delivered" ? "green" : "blue-gray"}
                        value={order.status}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order.paymentMethod}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order.user}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {order.deliveredAt}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderManagement