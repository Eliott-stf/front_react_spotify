import React from 'react'
import { ARTIST_URL, IMAGE_URL } from '../../constants/apiConstant'

const HeaderDetail = ({ dataArtist }) => {
    const imgArtist = dataArtist?.imagePath
        ? `${ARTIST_URL}/${dataArtist.imagePath}`
        : `${IMAGE_URL}/artist.png`;

    const artistName = dataArtist?.name ?? 'Artiste inconnu';

    return (
        <div className='w-full bg-linear-to-b from-green_top/30 via-green_top/10 to-transparent px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pb-10'>
            <div className='flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8'>
                <div className='shrink-0'>
                    <img
                        src={imgArtist}
                        alt={artistName}
                        className='w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl shadow-black/50 ring-2 ring-white/10'
                    />
                </div>
                <div className='flex flex-col items-center sm:items-start text-center sm:text-left w-full min-w-0'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                        {artistName}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HeaderDetail