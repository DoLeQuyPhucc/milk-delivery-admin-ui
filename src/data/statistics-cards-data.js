/*import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  getTotalDeliveredOrders,
  getTotalCancelledOrders,
  getTotalUserOrders,
  getTotalPriceOfAllOrders
} from '@/data/OrderAPI';
import { useEffect, useState } from "react";
const [deliveredOrders, setDeliveredOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);
    const [userOrders, setUserOrders] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const [delivered, cancelled, userOrders, price] = await Promise.all([
                    getTotalDeliveredOrders(),
                    getTotalCancelledOrders(),
                    getTotalUserOrders(),
                    getTotalPriceOfAllOrders()
                ]);
                
                setDeliveredOrders(delivered);
                setCancelledOrders(cancelled);
                setUserOrders(userOrders);
                setTotalPrice(price);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);
  
export const statisticsCardsData = [
  {
      color: "gray",
      icon: BanknotesIcon,
      title: "Total Delivered Orders",
      value: deliveredOrders,
      footer: {
          color: "text-green-500",
          value: "+55%",
          label: "than last week",
      },
  },
  {
      color: "gray",
      icon: UsersIcon,
      title: "Total Cancelled Orders",
      value: cancelledOrders,
      footer: {
          color: "text-green-500",
          value: "+3%",
          label: "than last month",
      },
  },
  {
      color: "gray",
      icon: UserPlusIcon,
      title: "Total User Orders",
      value: userOrders,
      footer: {
          color: "text-red-500",
          value: "-2%",
          label: "than yesterday",
      },
  },
  {
      color: "gray",
      icon: ChartBarIcon,
      title: "Total Price of All Orders",
      value: `${totalPrice}`,
      footer: {
          color: "text-green-500",
          value: "+5%",
          label: "than yesterday",
      },
  },
];

export default statisticsCardsData;*/
