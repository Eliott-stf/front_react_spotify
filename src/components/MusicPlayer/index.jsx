import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../store/player/playerSlice';
import Track from './Track';
import Controls from './Controls';
import Seekbar from './Seekbar';
import Player from './Player';

const MusicPlayer = () => {

    // on va récuperer toutes les données du slice player 
    const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);

    //on va déclarer nos states 
    const [shuffle, setShuffle] = useState(false); // mode aléatoire
    const [repeat, setRepeat] = useState(false); // mode répétition 
    const [volume, setVolume] = useState(0.3); // état du volume 30%
    const [duration, setDuration] = useState(0); //la durée de la musique
    const [seekTime, setSeekTime] = useState(0); //temps de musique joué
    const [appTime, setAppTime] = useState(0); //temps actuel de la musqiue 

    //on récupère le hook dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        // si le store contient un tableau de chansons, on dispatch playPause à true
        if (currentSongs?.length) dispatch(playPause(true));
    }, [currentIndex]) //Si current index change, on recharge le composant 

    // On définit nos méthodes 

    //méthode pour géré l'etat du play/pause
    const handlePlayPause = () => {
        if (!isActive) return;

        //si une chanson est active, on dispatch playPause
        isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true))
    };

    //méthode pour avancer d'une piste 
    const handleNextSong = () => {
        if (!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
        } else {
            dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
        }
    };

    //méthode pour reculer d'une piste 
    const handlePrevSong = () => {
        if (currentIndex === 0) {
            //on renvoi sur le dernier élements du tab
            dispatch(prevSong(currentSongs?.length - 1));
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)));
        } else {
            dispatch(prevSong(currentIndex - 1));
        }
    };

    return (
        <div className="relative sm:px-12 px-8 w-full flex items-center justify-between mt-5">
            <Track
                isPlaying={isPlaying}
                isActive={isActive}
                currentAlbum={currentAlbum}
                activeSong={activeSong}
            />
            <div className="flex flex-1 flex-col items-center justify-center">
                <Controls
                    isPlaying={isPlaying}
                    currentSongs={currentSongs}
                    isActive={isActive}
                    repeat={repeat}
                    shuffle={shuffle}
                    setRepeat={setRepeat}
                    setShuffle={setShuffle}
                    handlePlayPause={handlePlayPause}
                    handleNextSong={handleNextSong}
                    handlePrevSong={handlePrevSong}
                />
                {/* barre de progression de la musique */}
                <Seekbar
                    value={appTime} // La valeur actuel de la musique
                    min="0" //valeur minimum
                    max={duration} // temps de la musique
                    onInput={(event) => setSeekTime(event.target.value)} // recupère la position de la barre de lecture 
                    setSeekTime={setSeekTime} //pour hcanger la valeur de la barre de lecture
                    appTime={appTime}
                />
                {/* le player */}
                <Player
                    activeSong={activeSong} //la musique actuelle
                    volume={volume} //le volume
                    isPlaying={isPlaying} //si le player tourne
                    seekTime={seekTime}  //temps actuel de la chanson 
                    repeat={repeat} // savoir si on doit repeat le morceau 
                    currentIndex={currentIndex} // index de la musqiue actuelle
                    onEnded={handleNextSong} //passer a la chanson suivante a la fin 
                    onTimeUpdate={(event) => setAppTime(event.target.currentTime)} // mettre a jour le tps actuel de la musique 
                    onLoadedData={(event) => setDuration(event.target.duration)} // récup la durée de la musqiue
                />
            </div>
        </div>
    )
}

export default MusicPlayer