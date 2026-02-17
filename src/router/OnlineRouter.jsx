import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import App from "../App";
import Search from "../screens/OnlineScreens/Search";
import Library from "../screens/OnlineScreens/Library";
import Playlist from "../screens/OnlineScreens/Playlist";
import Wishlist from "../screens/OnlineScreens/Wishlist";
import Detail from "../screens/OnlineScreens/Detail";


const OnlineRouter = createBrowserRouter([

    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",   //Chemin de la vue 
                element: <Home/>,  //Element retourné
            },
            {
                path: "/search",   //Chemin de la vue 
                element: <Search/>,  //Element retourné
            },
            {
                path: "/library",   //Chemin de la vue 
                element: <Library/>,  //Element retourné
            },
            {
                path: "/playlist",   //Chemin de la vue 
                element: <Playlist/>,  //Element retourné
            },
            {
                path: "/wishlist",   //Chemin de la vue 
                element: <Wishlist/>,  //Element retourné
            },
            {
                path: "/detail/:id",   //Chemin de la vue 
                element: <Detail/>,  //Element retourné
            },
        ]
    }
]);

export default OnlineRouter;