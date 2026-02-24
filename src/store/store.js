import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import userReducer from "./user/userSlice";
import artistReducer from "./artist/artistSlice";

const store = configureStore({
    reducer:{
        // mettre ici les futurs réduceur
        albums: albumReducer,
        player: playerReducer,
        users: userReducer,
        artists: artistReducer
    }
})

export default store;