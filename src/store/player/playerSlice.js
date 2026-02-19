import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
    activeSong: {}, // l'objet chanson actuelle en cours de lecture
    currentAlbum: [], //info de l'album en cours de lecture
    currentIndex: 0, // index de la chanson dans son tableau 
    currentSongs: [], //tableau de toutes les chansons de la playlist/album
    isActive: false, // le player est il actif ?
    isPlaying: false // La musique est elle en lecture (true) ou en pause (false)
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        /**
         * Active une chanson et initialise le player 
         */
        setActiveSong: (state, action) => {
            // stocke la chanson à l'index donné
            state.activeSong = action.payload?.songs[action.payload.index];
            // Stocke toutes les chanson de l'album/playlist
            state.currentSongs = action.payload?.songs;
            // Stocke l'index de la chanson active
            state.currentIndex = action.payload?.index;
            // On active le player
            state.isActive = true;
        },

        /**
         * Stocke les informations de l'album en cours
         */
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data
        },

        /**
         * Passe a la chanson suivante ds la playlist
         */
        nextSong: (state, action) => {
            // Met a jour la chanson active
            state.activeSong = state.currentSongs[action.payload]
            
            // Met a jour l'index
            state.currentIndex = action.payload;

            // Met a jour l'album si la chanson en a un 
            // certaine musique peuvent ne pas avoir d'album associé (cas du single)
            state.currentAlbum = state.currentSongs[action.payload]?.album 
            ? state.currentSongs[action.payload]?.album
            : state.currentAlbum

            // On active le player
            state.isActive = true;
        },

        /**
         * Passe a la chanson précèdente ds la playlist
         */
        prevSong: (state, action) => {
            // Met a jour la chanson active
            state.activeSong = state.currentSongs[action.payload]
            
            // Met a jour l'index
            state.currentIndex = action.payload;

            // Met a jour l'album si la chanson en a un 
            // certaine musique peuvent ne pas avoir d'album associé (cas du single)
            state.currentAlbum = state.currentSongs[action.payload]?.album 
            ? state.currentSongs[action.payload]?.album
            : state.currentAlbum

            // On active le player
            state.isActive = true;
        },
        /**
         * Bascule entre play et pause
         */
        playPause: (state, action) => {
            state.isPlaying = action.payload
        }
    }
})

export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;