import React from 'react'
import { ALBUMS_URL, ARTIST_URL } from '../../constants/apiConstant'
import { Link } from 'react-router-dom'
import { totalDuration } from '../../services/toolsService'

const HeaderInfo = ({ dataAlbum }) => {

    //si pas d'image de l'artiste on prend celle de l'album car elle, elle est obligatoire
    const imgPath = dataAlbum?.artist?.imagePath
        ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}`
        : `${ALBUMS_URL}/${dataAlbum?.imagePath}`

    //on formate la date de sortie de l'album (on ne recupère que l'année)
    const releaseDate = dataAlbum?.releaseDate
        ? new Date(dataAlbum?.releaseDate).getFullYear().toString()
        : "Date inconnue"

    // on defini le nombre de titre par album 
    const nbTitle = dataAlbum?.songs
        ? dataAlbum?.songs?.length > 1
            ? `${dataAlbum?.songs?.length} titres`
            : `${dataAlbum?.songs?.length} titre`
        : '0 titre'

    //mini componant
    const Separator = <span className='text-gray-500 mx-1.5'>•</span>

    return (
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-0 gap-y-1 mt-3">
            <Link to={`/artist-detail/${dataAlbum?.artist?.id}`} className='inline-flex items-center gap-2 group'>
                <img src={imgPath} alt={dataAlbum?.artist?.name ?? "Artiste inconnu"} className='w-8 h-8 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-green transition' />
                <span className="font-semibold text-white text-sm sm:text-base group-hover:text-green transition">{dataAlbum?.artist?.name ?? "Artiste inconnu"}</span>
            </Link>
            {Separator}
            <span className="text-gray-400 text-sm sm:text-base">{releaseDate}</span>
            {Separator}
            <span className="text-gray-400 text-sm sm:text-base">{nbTitle}</span>
            {Separator}
            <span className="text-gray-400 text-sm sm:text-base">{dataAlbum?.songs?.length > 0 ? totalDuration(dataAlbum) : ''}
            </span>


        </div>
    )
}

export default HeaderInfo