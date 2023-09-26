import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Home from "../Pages/Home";
import Mobile from "../Pages/Mobile";

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
        path: "/mobile/test1",
        element: Mobile,
        Layout: DefaultLayout,
    },
    {
        path: "/mobile/test2",
        element: Mobile,
        Layout: DefaultLayout,
    },
];

const privateRouter: RouteConfig[] = [];

export { publishRouter, privateRouter };
