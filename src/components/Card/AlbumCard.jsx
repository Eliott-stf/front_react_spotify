import React from 'react'
import { Link } from 'react-router-dom'
import { ALBUMS_URL } from '../../constants/apiConstant';
import PlayPause from '../Services/PlayPause';

const AlbumCard = ({ data }) => {

    const imgAlbum = `${ALBUMS_URL}/${data?.imagePath}`
    const albumId = data?.id ?? 0;
    const albumName = data?.title ?? "Album inconnu"
    const artistName = data?.artist?.name ?? 'Artiste inconnu'

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
                {/* TODO: ici le bouton play/pause */}
                <div className={``}></div>
                <PlayPause />
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