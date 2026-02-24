import React from 'react'
import { useSelector } from 'react-redux'
import AlbumCard from '../Card/AlbumCard'

const ListAlbumArtist = ({ dataArtist }) => {
    const { isPlaying, activeSong } = useSelector((state) => state.player)
    const albums = dataArtist?.albums ?? []

    if (!albums.length) return null

    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 pt-4 pb-16'>
            <h2 className='text-xl font-bold text-white mb-6'>
                Albums
            </h2>
            <div className='flex flex-wrap gap-4 sm:gap-6'>
                {albums.map((album, index) => (
                    <AlbumCard
                        key={album.id ?? index}
                        data={album}
                        songs={album?.songs}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={0}
                        artist={dataArtist?.name}
                    />
                ))}
            </div>
        </section>
    )
}

export default ListAlbumArtist