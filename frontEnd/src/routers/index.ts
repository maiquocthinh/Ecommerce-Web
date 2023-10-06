import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import HeaderLayout from "../Layout/HeaderLayout/HeaderLayout";
import DetailProduct from "../Pages/DetailProduct";
import Home from "../Pages/Home";
import ProductPage from "../Pages/Product";
import Profile from "../Pages/Profile";

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
        path: "/:product/:detailProduct",
        element: DetailProduct,
        Layout: DefaultLayout,
    },
    {
        path: "/profile/:id",
        element: Profile,
        Layout: HeaderLayout,
    },
];

const privateRouter: RouteConfig[] = [];

export { privateRouter, publishRouter };

