import React, { useState, useEffect } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/components/atoms/cards";
import { StatisticsChart } from "@/components/atoms/charts";
import {
  statisticsChartsData,
} from "@/data";
import {
  getTotalDeliveredOrders,
  getTotalCancelledOrders,
  getTotalUserOrders,
  getTotalPriceOfAllOrders
} from '@/data/OrderAPI';
import { ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
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

        setDeliveredOrders(delivered.totalDeliveredOrders || 0);
        setCancelledOrders(cancelled.totalCancelledOrders || 0);
        setUserOrders(userOrders.totalUserOrders || 0);
        setTotalPrice(price.totalPriceOfAllOrders  || 0);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  const statisticsCardsData = [
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
      value: `${totalPrice} VND`,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
