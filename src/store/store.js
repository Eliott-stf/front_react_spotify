import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";

const store = configureStore({
    reducer:{
        //TODO: mettre ici les futurs réduceur
        albums: albumReducer
    }
})

export default store;