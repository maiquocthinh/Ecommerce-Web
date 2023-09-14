import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Home from "../Pages/Home";

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
];

const privateRouter: RouteConfig[] = [];

export { publishRouter, privateRouter };
