import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
    name: "albums",
    initialState: {
        loading: false,
        albums: [],
        albumDetail: {},
        albumByGenre: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAlbums: (state, action) => {
            state.albums = action.payload
        },
        setAlbumDetail: (state, action) => {
            state.albumDetail = action.payload.member[0]
        },
        setAlbumByGenre: (state, action) => {
            state.albumByGenre = action.payload
        }
    }
})

export const { setLoading, setAlbums, setAlbumDetail, setAlbumByGenre } = albumSlice.actions;

/**
 * ===============================
 * PARTIE DES REQUETES SUR L'API
 * ===============================
 */

//méthode qui récupère tout les albums actifs
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
//méthode qui récupère tout les albums grace a son id
export const fetchAlbumDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/albums?id=${id}&isActive=true`);
        dispatch(setAlbumDetail(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupèration des détails de l'album : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

//méthode qui récupère tout les albums par genre 
export const fetchAlbumByGenre = (genreArray) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        //1 boucle sur notre tableau de genre (ManyToMany ^^)
        let result = [];
        genreArray && genreArray.map(async (genre) => {
            const label = genre.label;
            //2 on va faire la requete sur chaque genre
            const response = await axios.get(`${API_URL}/albums?page=1&genre.label=${label}&isActive=true`);
            //3 concatener les résulatats en supprimant les doublons 
            result = result.concat(response.data.member);
            //3 filter les doublons 
            result = result.filter((album, index, self) => (
                index === self.findIndex((t) => (
                    t.id === album.id && t.title === album.title
                ))
            ))
            //3 bis on limite le tab avec un rdm de 5 résultats
            result = result.sort(() => Math.random() - Math.random()).slice(0, 5);
            //on set le résultat du new tab
            dispatch(setAlbumByGenre(result));
        })
    } catch (error) {
        console.log(`Erreur lors de la récupèration des albums triés par genre : ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}



export default albumSlice.reducer;