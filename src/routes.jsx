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
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, UserManagement, OrderManagement, ShipperManagement, Demo } from "@/components/pages/dashboard";
import { SignIn, SignUp } from "@/components/pages/auth";
import ProductManagement from "./components/pages/dashboard/product-management";
import PackageManagement from "./components/pages/dashboard/package-managment";
import BrandManagement from "./components/pages/dashboard/brand-management";
import StoreManagement from "./components/pages/dashboard/store-management";


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
        icon: <InformationCircleIcon {...icon} />,
        name: "product ",
        path: "/product",
        element: <ProductManagement />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
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
        icon: <ShoppingCartIcon {...icon} />,
        name: "store",
        path: "/store",
        element: <StoreManagement/>
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "brand",
        path: "/brand",
        element: <BrandManagement />,
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
        element: <Profile />,
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
