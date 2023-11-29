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
import ResetPassword from "../Pages/ResetPassword";
import Brands from "../Pages/admin/Catalog/Brands/Brands";
import Categories from "../Pages/admin/Catalog/Categories/Categories";
import Needs from "../Pages/admin/Catalog/Needs/Needs";
import Customers from "../Pages/admin/Customers/Customers";
import Dashboard from "../Pages/admin/Dashboard/Dashboard";
import Employees from "../Pages/admin/Employees/Employees";
import OrderDetail from "../Pages/admin/Orders/OrderDetail/OrderDetail";
import Orders from "../Pages/admin/Orders/Orders";
import AdminDetailProduct from "../Pages/admin/ProductsManager/AdminProductVersion/AdminProductVersion";
import ProductsManager from "../Pages/admin/ProductsManager/ProductsManager";
import RoleManager from "../Pages/admin/RoleManager/RoleManager";
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
        path: "/product/:type/:name/:id",
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
        path: "/reset-password",
        element: ResetPassword,
        Layout: HeaderLayout,
    },
    {
        path: "/reset-password/:token",
        element: ResetPassword,
        Layout: HeaderLayout,
    },
    {
        path: "/checkout",
        element: Checkout,
        Layout: null,
    },
    {
        path: "/profile/order",
        element: Order,
        Layout: HeaderLayout,
    },
    {
        path: "/admin/login",
        element: Login,
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
    {
        path: "/admin/orders",
        element: Orders,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/categories",
        element: Categories,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/brands",
        element: Brands,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/needs",
        element: Needs,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products",
        element: ProductsManager,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-detail/:id",
        element: AdminDetailProduct,
        Layout: AdminLayout,
    },
    {
        path: "/admin/employees",
        element: Employees,
        Layout: AdminLayout,
    },
    {
        path: "/admin/role",
        element: RoleManager,
        Layout: AdminLayout,
    },
    {
        path: "/admin/order-detail/:id",
        element: OrderDetail,
        Layout: null,
    },
];

const privateRouter: RouteConfig[] = [];

export { privateRouter, publishRouter };
