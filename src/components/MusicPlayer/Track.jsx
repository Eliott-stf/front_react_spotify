import React from 'react'
import { ALBUMS_URL } from '../../constants/apiConstant'
import ArtistDetail from '../../screens/OnlineScreens/ArtistDetail';
import { useSelector } from 'react-redux';

const Track = ({ isPlaying, isActive, currentAlbum, activeSong, artist = 'Artiste inconnu' }) => {

    // on crée nos variables
    const {artistDetail} = useSelector((state) => state.artists)
    const imgAlbum = `${ALBUMS_URL}/${currentAlbum?.imagePath}`
    const title = activeSong?.title ?? "Musique inconnue";
    const album = currentAlbum?.title ?? "Album inconnu"

    const artistName = currentAlbum?.artist?.name 
    ? currentAlbum?.artist?.name 
    : artistDetail?.name 
        ?artistDetail?.name
        : artist;


    return (
        <div className='flex flex-1 items-center justify-start'>
            <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block w-16 h-16 mr-4`}>
                <img src={imgAlbum} alt={`image album ${album}`} className='rounded-full' />
            </div>
            <div className="w-1/2 ">
                <p className="truncate text-white font-bold text-lg">{title}</p>
                <p className="truncate text-gray-500">{artistName}</p>
            </div>
        </div>
    )
}

export default Track