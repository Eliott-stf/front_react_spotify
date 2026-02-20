import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const fetchAddRemoveFavorite = async (arrayIds, userId) => {

    const dataFavorite = {
        albums: arrayIds
    }

    try {
        // ajouter la méthode patch à axios
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json"
        const response = await axios.patch(`${API_URL}/users/${userId}`, dataFavorite);
        if (response.status === 200) {
            console.log("response", response);
        } else {
            console.log("erreur lors du fetchAddRemoveFavorite");
        }

    } catch (error) {
        console.log(`erreur lors du fetchAddRemoveFavorite: ${error}`);
    }

}