import React from 'react'
import { Link } from 'react-router-dom'
import { ALBUMS_URL } from '../../constants/apiConstant';
import PlayPause from '../Services/PlayPause';
import { setActiveAlbum, setActiveSong, playPause } from '../../store/player/playerSlice';
import { useDispatch } from 'react-redux';

const AlbumCard = ({ data, songs, isPlaying, index, activeSong, artist = "inconnu" }) => {

    // On déclare des variables de data
    const imgAlbum = `${ALBUMS_URL}/${data?.imagePath}`
    const albumId = data?.id ?? 0;
    const albumName = data?.title ?? "Album inconnu"
    const artistName = data?.artist?.name ?? artist

    // récupèrer le hook de dispatch
    const dispatch = useDispatch();

    //méthode lorsqu'on met pause 
    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    //méthode lorsqu'on met play
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({ songs, data, index }));
        dispatch(setActiveAlbum({ data }));
        dispatch(playPause(true));
    }

    return (
        <div className="flex flex-col w-62.5 p-4 bg-white_01 hover:bg-white_05 transition-all ease-in-out duration-500 animate-slideup rounded-lg cursor-pointer group">
            <div className="relative w-full flex flex-col">
                <Link to={`/detail/${albumId}`}>
                    <img
                        src={imgAlbum}
                        alt={`image de l'album ${albumName}`}
                        className='mx-auto rounded-lg object-cover h-52 w-52'
                    />
                </Link>
                {/* Ici le bouton play/pause */}
                <div className={`absolute ${activeSong?.title === songs[index]?.title ? 'flex' : 'hidden'} group-hover:flex right-3 bottom-5 `}>
                    <div className="group-hover:animate-slideup2 bg-black outline-none rounded-full group-hover:duration-75 overflow-hidden">
                        <PlayPause
                            songs={songs}
                            activeSong={activeSong}
                            isPlaying={isPlaying}
                            index={index}
                            data={data}
                            handlePause={handlePauseClick}
                            handlePlay={() => handlePlayClick(index)}
                        />
                    </div>
                </div>
                <Link to={`/detail/${albumId}`}>
                    <div className="mt-4 flex flex-col">
                        <p className="text-white text-xl truncate font-bold">{albumName}</p>
                        <p className="text-white text-sm truncate">{artistName}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AlbumCard