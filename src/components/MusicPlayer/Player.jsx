import React, { useEffect, useRef } from 'react'
import { MUSIC_URL } from '../../constants/apiConstant';

const Player = ({ activeSong, volume, isPlaying, seekTime, repeat, currentIndex, onEnded, onTimeUpdate, onLoadedData }) => {
    // on crée une référence du player
    const ref = useRef(null);
    const srcAudio = `${MUSIC_URL}/${activeSong?.filePath}`

    if(ref.current){
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    useEffect(() => {
        //on affilie le volume au player 
        ref.current.volume = volume
    }, [volume])

    useEffect(() => {
        //on affilie la position de la musique au player 
        ref.current.currentTime = seekTime;
    }, [seekTime])

    return (
        <audio
            src={srcAudio}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    )
}

export default Player