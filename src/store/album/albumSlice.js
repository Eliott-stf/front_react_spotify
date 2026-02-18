import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
    name: "albums",
    initialState: {
        loading: false,
        albums: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAlbums: (state, action) => {
            state.albums = action.payload
        }
    }
})

export const { setLoading, setAlbums } = albumSlice.actions;

/**
 * ===============================
 * PARTIE DES REQUETES SUR L'API
 * ===============================
 */

export const fetchAlbums = (page = 1) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/albums?page=${page}&isActive=true`);
        dispatch(setAlbums(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupèration des albums : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default albumSlice.reducer;