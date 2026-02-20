import React, { useEffect, useState } from 'react'
import { USER_INFOS } from '../../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavorites } from '../../store/user/userSlice';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import { fetchAddRemoveFavorite } from '../../services/userFavoriteService';
import PageLoader from '../Loader/PageLoader';
import PlayPause from '../Services/PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';

const ToolbarDetail = ({ dataAlbum }) => {

    // on déclare nos constantes 
    const data = dataAlbum; //info de l'album
    const songs = dataAlbum?.songs; //tab de chansons
    const albumId = dataAlbum?.id; //id  de l'album

    //récupèration de l'id user depuis le contexte 
    // const {userId} = useAuthContext()
    //récupèration de l'id user depuis le localStorage 
    const userId = localStorage.getItem(USER_INFOS)
        ? JSON.parse(localStorage.getItem(USER_INFOS)).userId
        : null;

    //on declare nos states
    const [index, setIndex] = useState(0) //pour l'index des chansons
    const [isLoading, setIsLoading] = useState(false) //flag pour afficher loader lors de la mise en favoris
    const [isCollapse, setIsCollapse] = useState(false) //pour ouvrir/fermer la collapse
    const [isInList, setIsInList] = useState(false) //savoir si l'album est dans la liste des favoris
    const [listArray, setListArray] = useState([]) // tableau d'URI des albums fav (format: '/api/albums/id')

    //récup le hook
    const dispatch = useDispatch();

    //on va faire les courses , on récupère les infos du store 
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    //on récupère la liste des favris de l'utilisateur depuis le store
    const { loading, userFavorites } = useSelector((state) => state.users);

    //méthode qui vérifie si l'album est dans la liste des favoris 
    const checkFavorite = () => {
        //si il a des favoris
        if (userFavorites) {
            //on récupère les ids des albums favoris reconstru en URI
            const idArray = userFavorites.map((item) => `/api/albums/${item.id}`)

            //on set la liste dans notre state listArray en supprimant les doublons avec new Set
            setListArray([...new Set(idArray)]);

            //on verifie si l'album est dans la liste 
            if (idArray.includes(`/api/albums/${albumId}`)) {
                setIsInList(true);
            }
        }
    }

    useEffect(() => {
        dispatch(fetchUserFavorites(userId));
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        checkFavorite();
    }, [loading])

    //méthode lorsqu'on met pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    //méthode pour mettre play 
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({ songs, data, index }));
        dispatch(setActiveAlbum({ data }));
        dispatch(playPause(true));
    }

    //méthode pour ouvrir/fermer la collapse
    const handleCollapseClick = () => {
        setIsCollapse(!isCollapse);

    }

    //méthode pour gerer les favoris ajouter/enlever
    const toggleFavorite = async () => {
        //on créer une copie de l'atat actuel de listArray
        let updatedListArray = [...listArray];

        //on vérifie si l'album est dans la liste
        if (isInList) {
            //si il est dans la liste on le retire
            updatedListArray = listArray.filter((item) => item !== `/api/albums/${albumId}`)
        } else {
            //si non, on l'ajoute dans le tableau 
            updatedListArray.push(`/api/albums/${albumId}`)
        }

        //on appelle le service pour mettre a jour les fav dans la bdd
        await fetchAddRemoveFavorite(updatedListArray, userId)

        setListArray(updatedListArray);
        setIsInList(!isInList);

    }

    return (
        loading ? <PageLoader /> :
            <>
                <div className="flex items-center gap-1 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="cursor-pointer">
                        <PlayPause
                            songs={songs}
                            handlePause={handlePauseClick}
                            handlePlay={() => handlePlayClick(index)}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={index}
                            data={data}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={toggleFavorite}
                        className='p-3 rounded-full text-white/70 hover:text-green hover:scale-105 transition-all cursor-pointer'
                        aria-label={isInList ? "Retirer les favoris" : "Ajouter aux favoris"}
                    >
                        {isInList ? <AiFillHeart size={28} className='text-green' /> : <AiOutlineHeart size={28} />}
                    </button>
                    <button
                        type="button"
                        onClick={handleCollapseClick}
                        className='p-3 rounded-full text-white/70 hover:text-green hover:scale-105 transition-all cursor-pointer'
                        aria-label={isCollapse ? "Masquer les infos" : "Afficher les infos"}
                    >
                        {isCollapse ? <AiFillInfoCircle size={28} className='text-green' /> : <AiOutlineInfoCircle size={28} />}
                    </button>
                </div>
                <div className="px-4 sm:px-6 lg:px-8">
                    <Collapse isOpened={isCollapse}>
                        <InfoCollapse dataAlbum={dataAlbum} />
                    </Collapse>
                </div>
            </>
    )
}

export default ToolbarDetail