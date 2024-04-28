import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Basic = lazy(() => import("../pages/Basic"));

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Basic /></Suspense>,
    },
]);

export default root;