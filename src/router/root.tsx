import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Basic = lazy(() => import("../pages/Basic"));
const Login = lazy(() => import("../pages/Login"));
const TestAddr = lazy(() => import("../pages/TestAddr"));

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Basic /></Suspense>,
    },
    {
        path: "/login",
        element: <Suspense fallback={Loading}><Login /></Suspense>,
    },
    {
        path: "/TestAddr",
        element: <Suspense fallback={Loading}><TestAddr /></Suspense>,
    }
]);

export default root;