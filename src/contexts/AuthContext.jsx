// ===========================
// CONTEXTE D'AUTHENTIFICATION
// ===========================
//Ce context gère l'authentification globale de l'application 
//Il permet de partager l'état de connexion entre tous les composants 
//Avantage : Evite le prop drilling (passage de props a travers plusieur niveaux de composant)

import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

// ====================
// CREATION DU CONTEXT
// ====================
//On défini la structure du context avec valeurs par défaut 
const AuthContext = createContext({
    userId: '', //Id de l'utilisateur connecté
    email: '', //email de l'utilisateur
    nickname: '', //Pseudo de l'utilisateur
    setUserId: () => { }, //fonction pour modifier userId
    setEmail: () => { }, //fonction pour modifier email
    setNickname: () => { }, //fonction pour modifier nickname
    signIn: async () => { }, //fonction de connexion
    signOut: async () => { } //fonction de déconnexion
});

// ====================
// PROVIDER DU CONTEXT 
// ====================
// Le Provider encapsule toute l'application et rend les données accessibles 
const AuthContextProvider = ({ children }) => {
    // Etats locaux pour stocker les infos utilisateurs
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    // ====================
    // METHODE DE CONNEXION
    // ====================
    /**
     * Connecte un utilisateur et sauvegarde ses infos
     * @param {Objet} user - Objet qui contient userId, email et nickname
     * exemple d'objet attendu
     * {
     *  userId: 1
     *  email: "toto@toto.com"
     *  nickname: "toto"
     * }
     */
    const signIn = async (user) => {
        try {
            //mise à jour des états avec les données utilisateur
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);

            //Sauvegarder dans le local storagede l'utilisateur
            localStorage.setItem(USER_INFOS, JSON.stringify(user));

        } catch (error) {
            throw new Error(`Erreur lors de la connexion: ${error}`);
        }
    }

    // ======================
    // METHODE DE DECONNEXION
    // ======================
    /**
     * Deconnecte l'utilisateur et nettoie les données 
     */
    const signOut = async () => {
        try {
            setUserId('');
            setEmail('');
            setNickname('');

            //supprimer le localStorage
            localStorage.removeItem(USER_INFOS);

        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion: ${error}`);
        }
    }

    // ==================
    // VALEUR DU CONTEXTE
    // ==================
    //Objet contenant toutes les valeurs et fonctions à partager
    const value = {
        userId,
        email,
        nickname,
        setUserId,
        setEmail,
        setNickname,
        signIn,
        signOut
    }

    //Rendu du Provider avec ses valeurs
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

// =================
// HOOK PERSONNALISE
// =================
//Hook pour faciliter l'accès au contexte dans les composants 
//Usage: const {userId, signIn} = useAuthContext()
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };