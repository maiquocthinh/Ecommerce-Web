import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import HeaderLayout from "../Layout/HeaderLayout/HeaderLayout";
import Cart from "../Pages/CartPage";
import DetailProduct from "../Pages/DetailProduct";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ProductPage from "../Pages/Product";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";

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
    },    {
        path: "/register",
        element: Register,
        Layout: HeaderLayout,
    },
];

const privateRouter: RouteConfig[] = [];

export { privateRouter, publishRouter };

