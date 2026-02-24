import React from 'react'
import { useSelector } from 'react-redux'
import AlbumCard from '../Card/AlbumCard';

const AlbumSuggestion = ({ albumByGenre }) => {

    const { isPlaying, activeSong } = useSelector((state) => state.player)

    if (!albumByGenre?.length) return null;


    return (
        <div className='w-full px-4 sm:px-6 lg:px-8 pt-10 pb-16'>
            <h2 className='text-xl font-bold text-white mb-6'>
                Dans le mếme genre
            </h2>
            <div className="flex flex-wrap gap-4 sm:gap-6">
                {albumByGenre && albumByGenre.map((album, index) => (
                    <AlbumCard
                        key={album?.id ?? index}
                        data={album}
                        songs={album?.songs}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={0}
                    />
                ))}
            </div>
        </div>
    )
}

export default AlbumSuggestion