import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from "react-icons/ai"
import { IMAGE_URL } from "./apiConstant"
import { BiLibrary } from "react-icons/bi"
import { MdFavoriteBorder } from "react-icons/md"
import { FiSettings } from "react-icons/fi"

// ====================
// CLE DU LOCAL STORAGE
// ====================
export const USER_INFOS = "userInfos"

//Logo de l'application 
export const IMG_LOGO = `${IMAGE_URL}/logo.png`

// ====================
// CONFIG DE LA SIDEBAR
// ====================

//Navigation principale (albums et musique)
export const dataAlbumNav = [
    {title: "Accueil", path: "/", icon: AiOutlineHome},
    {title: "Rechercher", path: "/search", icon: AiOutlineSearch},
    {title: "Bibliothèque", path: "/library", icon: BiLibrary}
]

//Navigation utilisateur (compte et playlist)
export const dataUserNav = [
    {title: "Mes playlists", path: "/playlist", icon: AiOutlineAppstoreAdd},
    {title: "Titre likés", path: "/wishlist", icon: MdFavoriteBorder},
    {title: "Mon compte", path: "/account/:id", icon: FiSettings}
]

//Style pour les icons
export const styleIcon = {width:'25px', height: '25px'};
export const tableIcon = {width:'20px', height: '20px'};