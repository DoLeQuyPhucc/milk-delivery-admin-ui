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
import { Line } from 'react-chartjs-2';
import {
  getTotalDeliveredOrders,
  getTotalCancelledOrders,
  getTotalUserOrders,
  getTotalPriceOfAllOrders,
  getTotalOrdersInMonth
} from '@/data/OrderAPI';
import { ClockIcon } from "@heroicons/react/24/solid";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Home() {
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [userOrders, setUserOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState([]);

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
        setTotalPrice(price.totalPriceOfAllOrders || 0);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    const fetchMonthlyOrders = async () => {
      try {
        const year = 2024;
        const promises = [];
        for (let month = 1; month <= 12; month++) {
          promises.push(getTotalOrdersInMonth(year, month));
        }
        const results = await Promise.all(promises);
        setMonthlyOrders(results.map(result => result.totalOrdersInMonth));
      } catch (error) {
        console.error('Error fetching monthly orders:', error);
      }
    };

    fetchStatistics();
    fetchMonthlyOrders();
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

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Total Orders',
        data: monthlyOrders,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders for 2024',
      },
    },
  };

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
      <div className="mb-6">
        <Typography variant="h6" color="blue-gray">
          Total Orders in 2024
        </Typography>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Home;
