import React, { useState } from 'react'
import { dataAlbumNav, dataUserNav, IMG_LOGO, styleIcon } from '../../constants/appConstant';
import Navlinks from './Navlinks';
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

//Mini composant pour la déconnexion
const Logout = () => {
    const { signOut } = useAuthContext();
    const navigate = useNavigate();

    //on se créer la méthode de déconnexion
    const handleLogout = () => {
        signOut();
        navigate("/");
    }

    return (
        <button onClick={() => {
            const confirmLogout = window.confirm("Voulez vous vraiment vous déconnecter ?");
            if (confirmLogout) handleLogout()
        }}
            className='link-sidebar'>
            <FiLogOut className="mr-2" style={styleIcon} />
            Déconnexion
        </button>
    )
}

const Sidebar = () => {
    //on créer nos states
    const [mobileMenu, setMobileMenu] = useState(false);

    //on récupère l'id de l'utilisateur connecté grace au context d'authentification
    const { userId } = useAuthContext();

    return (
        <>
            {/* sidebar vue au dessus de 768px */}
            <div className="hidden md:flex flex-col w-60 py-10 px-4 bg-black justify-between">
                <div>
                    <img className="w-full h-14 object-contain" src={IMG_LOGO} alt="Logo Spotify" />
                    <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
                    {/* TODO/ ici la boucle pour afficher la liste des onglets suivant le tab data*/}
                    <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />

                    <h2 className="text-lg text-white font-semibold mt-10">Utilisateur</h2>
                    <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />

                </div>
                {/* ajout du btn logout */}
                <div className="mt-5">
                    <Logout />
                </div>
                {/* menu mobile */}

            </div>
            {/* gestion des icones pour ouvrir/fermer le menu en petit ecran */}
            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenu ? (
                    <RiCloseLine
                        style={styleIcon}
                        className='text-white mr-2'
                        onClick={() => setMobileMenu(false)}
                    />
                ) : (
                    <HiOutlineMenu
                        style={styleIcon}
                        className='text-white mr-2'
                        onClick={() => setMobileMenu(true)}
                    />
                )}
            </div>
            {/* sidebar vue en dessus de 768px */}
            <div className={`z-20 absolute top-0 h-screen w-2/3 bg-linear-to-tl from-white_01 to-black backdrop-blur-lg md:hidden smooth-transition duration-500
               ${mobileMenu ? 'left-0' : '-left-full'} flex flex-col justify-between p-6 `}>
                <div>
                    <img className="w-full h-14 object-contain" src={IMG_LOGO} alt="Logo Spotify" />
                    <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
                    {/* TODO/ ici la boucle pour afficher la liste des onglets suivant le tab data*/}
                    <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />

                    <h2 className="text-lg text-white font-semibold mt-10">Utilisateur</h2>
                    <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />

                </div>
                {/* ajout du btn logout */}
                <div className="mt-5">
                    <Logout />
                </div>
                {/* menu mobile */}

            </div>

        </>
    )
}

export default Sidebar