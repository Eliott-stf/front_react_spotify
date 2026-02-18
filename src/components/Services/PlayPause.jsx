import React from 'react'
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs'

const PlayPause = ({
    size = "60px", //la taille du bouton 60px par defaut
    isPlaying, // gere l'état si on ets en lecture ou en pause
    songs, //tableau de chansons
    activeSong, // Infos de la chanson en cours de lecture 
    handlePlay, // fonction pour mettre en lecture
    handlePause, //fonction pour mettre een pause 
    index // index de la chanson dans son tableau  
}) => {
    return (
        //on check si on est en mode play (isPlaying) et 
        //si le titre de la chanson en cours de lecture = au titre de la chanson du tableau a l'index donné
        isPlaying && activeSong?.title == songs?.[index]?.title ?
            <BsPauseCircleFill
                size={size}
                className='text-green shadow-md cursor-pointer'
                onClick={handlePause}
            />
            :
            <BsPlayCircleFill
                size={size}
                className='text-green shadow-md cursor-pointer'
                onClick={handlePlay}
            />
    )
}

export default PlayPause