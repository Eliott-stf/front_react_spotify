import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        albums: albumReducer,
        player: playerReducer
    }
})

export default store;