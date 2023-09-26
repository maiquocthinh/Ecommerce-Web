import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publishRouter, privateRouter } from "./routers";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./global.css"
import generatePathArray from "./utils/Pathname";
import { setPathArray } from "./app/pathSlice";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const pathname = location.pathname;
        const pathArray = generatePathArray(pathname);
        dispatch(setPathArray(pathArray));
    }, [location, dispatch]);
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
