import {
  HomeIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  ExclamationCircleIcon,
  Cog8ToothIcon,
  ServerStackIcon,
  RectangleStackIcon,
  InformationCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, UserManagement, OrderManagement, ShipperManagement, Demo } from "@/components/pages/dashboard";
import { SignIn, SignUp } from "@/components/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user management",
        path: "/users",
        element: <UserManagement />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "order management",
        path: "/orders",
        element: <OrderManagement />,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "shipper management",
        path: "/shipper",
        element: <ShipperManagement />,
      },
      {
        icon: <ExclamationCircleIcon {...icon} />,
        name: "Reports & Analytics",
        path: "/reports-analytics",
        element: <Profile />,
      },
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "setting",
        path: "/setting",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "demo",
        path: "/demo",
        element: <Demo />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "demo",
        path: "/demo",
        element: <Demo />,
      }
    ],
  },
];

export default routes;
