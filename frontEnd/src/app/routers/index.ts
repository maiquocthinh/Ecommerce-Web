import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import HeaderLayout from "../Layout/HeaderLayout/HeaderLayout";
import Cart from "../Pages/CartPage";
import Checkout from "../Pages/Checkout";
import DetailProduct from "../Pages/DetailProduct";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Order from "../Pages/Order";
import ProductPage from "../Pages/Product";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import Customers from "../Pages/admin/Customers/Customers";
import Dashboard from "../Pages/admin/Dashboard/Dashboard";
import ALlStaff from "../Pages/admin/Staff/AllStaff";

interface RouteConfig {
    path: string;
    element: React.ComponentType;
    Layout: any;
}

const publishRouter: RouteConfig[] = [
    {
        path: "/",
        element: Home,
        Layout: DefaultLayout,
    },
    {
        path: "/:product",
        element: ProductPage,
        Layout: DefaultLayout,
    },
    {
        path: "/product/:productId",
        element: DetailProduct,
        Layout: DefaultLayout,
    },
    {
        path: "/profile/:id",
        element: Profile,
        Layout: HeaderLayout,
    },
    {
        path: "/cart",
        element: Cart,
        Layout: HeaderLayout,
    },
    {
        path: "/login",
        element: Login,
        Layout: HeaderLayout,
    },
    {
        path: "/register",
        element: Register,
        Layout: HeaderLayout,
    },
    {
        path: "/checkout",
        element: Checkout,
        Layout: null,
    },
    {
        path: "/order",
        element: Order,
        Layout: null,
    },
    {
        path: "/admin/dashboard",
        element: Dashboard,
        Layout: AdminLayout,
    },
    {
        path: "/admin/customers",
        element: Customers,
        Layout: AdminLayout,
    },
    {
        path: "/admin/staff",
        element: ALlStaff,
        Layout: AdminLayout,
    },
];

const privateRouter: RouteConfig[] = [];

export { privateRouter, publishRouter };
