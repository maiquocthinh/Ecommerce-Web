import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "./app/Layout/DefaultLayout/DefaultLayout";
import { publishRouter } from "./app/routers";
import "./global.css";
function App() {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const pathname = location.pathname;
    //     const pathArray = generatePathArray(pathname);
    //     dispatch(setPathArray(pathArray));
    // }, [location, dispatch]);
    return (
        <Router>
            <div>
                <Routes>
                    {publishRouter.map((route, index) => {
                        let Layout = DefaultLayout;
                        const Page = route.element;
                        if (route.Layout) {
                            Layout = route.Layout;
                        } else if (route.Layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
