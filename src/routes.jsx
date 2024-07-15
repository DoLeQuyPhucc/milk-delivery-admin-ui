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
  ArchiveBoxIcon,
  ChartBarIcon,
  InboxStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, ShipperManagement, Demo } from "@/components/pages/dashboard";
import { SignIn, SignUp } from "@/components/pages/auth";
import ProductManagement from "./components/pages/dashboard/product-management";
import PackageManagement from "./components/pages/dashboard/package-managment";
import BrandManagement from "./components/pages/dashboard/brand-management";
import StoreManagement from "./components/pages/dashboard/store-management";
import UserManagement from "./components/pages/dashboard/user-management";
import { CalendarFilled, TagFilled } from "@ant-design/icons";
import OrderCalendar from "./components/pages/dashboard/shipment-management";
import OrderManagement from "./components/pages/dashboard/order-management";
import ShipmentManagment from "./components/pages/dashboard/shipment-management";



const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <ChartBarIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "product ",
        path: "/product",
        element: <ProductManagement />,
      },
      {
        icon: <InboxStackIcon {...icon} />,
        name: "package ",
        path: "/package",
        element: <PackageManagement />,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "order ",
        path: "/orders",
        element: <OrderManagement />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user ",
        path: "/users",
        element: <UserManagement />,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "shipper ",
        path: "/shipper",
        element: <ShipperManagement />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "store",
        path: "/store",
        element: <StoreManagement/>
      },
      {
        icon: <TagFilled {...icon} />,
        name: "brand",
        path: "/brand",
        element: <BrandManagement />,
      },
      {
        icon: <ShoppingCartIcon {...icon}/>,
        name: "shipment",
        path: "/shipment",
        element: <ShipmentManagment/>,
      }
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
