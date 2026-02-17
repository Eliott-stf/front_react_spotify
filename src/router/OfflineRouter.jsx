import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";

const OfflineRouter = createBrowserRouter([

    {
        element: <HomeOffline/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",   //Chemin de la vue 
                element: <Login/>,  //Element retourné
            },
            {
                path: "/register",
                element: <Register/>,
            }
        ]
    }
]);

export default OfflineRouter