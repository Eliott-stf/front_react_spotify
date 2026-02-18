/**
 * CONSTANTES DE L'API
 * ce ficher centralise toute les URL de l'api Symfony
 * l'avantage: Modifier l'url de base en un seul endroit  
*/

//URL racine du serveur backend 
export const API_ROOT = "http://localhost:8088";

//L'URL de base de l'API Platform
export const API_URL = `${API_ROOT}/api`

/**
 * URL DES RESSOURCES STATIQUES
*/

//Images générales (logo, etc)
export const IMAGE_URL = `${API_ROOT}/images`;

//Images des avatars utilisateurs
export const AVATAR_URL = `${IMAGE_URL}/avatars`

//Image de cover des albums
export const ALBUMS_URL = `${API_ROOT}/upload/images/albums`;

//Photos des artistes 
export const ARTIST_URL = `${API_ROOT}/upload/images/artists`;

//Fichiers audio MP3
export const MUSIC_URL = `${API_ROOT}/upload/files/music`;


