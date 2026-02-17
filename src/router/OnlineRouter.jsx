import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/HomeOffline";
import App from "../App";


const OnlineRouter = createBrowserRouter([

    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",   //Chemin de la vue 
                element: <Home/>,  //Element retourné
            },
        ]
    }
]);

export default OnlineRouter;