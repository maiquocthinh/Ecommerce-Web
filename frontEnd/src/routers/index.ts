import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import DetailProduct from "../Pages/DetailProduct";
import Home from "../Pages/Home";
import Mobile from "../Pages/Mobile";
import ProductPage from "../Pages/Product";

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
        path: "/mobile",
        element: Mobile,
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
];

const privateRouter: RouteConfig[] = [];

export { publishRouter, privateRouter };
