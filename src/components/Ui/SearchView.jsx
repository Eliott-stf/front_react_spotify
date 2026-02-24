import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import selectAlbumData from '../../store/album/albumSelector';
import AlbumCard from '../Card/AlbumCard';
import ArtistCard from '../Card/ArtistCard';

const SearchView = ({ word }) => {

    //on déclare nos states
    const [searchWord, setSearchWord] = useState(word);
    //on récupère les infos du slice album
    const { searchAlbum, searchTitle, searchArtist } = useSelector(selectAlbumData);
    //on récpuère les infos du slice player 
    const { isPlaying, activeSong } = useSelector((state) => state.player);

    //on déclare nos constantes
    const dataAlbum = searchAlbum.member
    const dataTitle = searchTitle.member
    const dataArtist = searchArtist.member

    return (
        <>
            {/* cas ou on a aucun résultat */}
            {dataAlbum && dataAlbum?.length === 0
                && dataTitle && dataTitle?.length === 0
                && dataArtist && dataArtist?.length === 0 &&
                (<h2 className='font-bold text-3xl text-white text-left mt-10 mb-4 ml-4' > {`Aucun résultat trouvé pour: ${searchWord}`}</h2>)
            }

            {/* partie albums */}
            {dataAlbum && dataAlbum?.length > 0
                ? (<h2 className='ml-6 text-2xl font-bold text-white mb-6'>Albums <span className="text-gray-400">({dataAlbum.length})</span></h2>)
                : null
            }

            <div className="flex flex-wrap">
                {dataAlbum && dataAlbum.map((data, index) => (
                    <div className="p-3 m-3" key={`album_${index}`}>
                        <AlbumCard
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            index={0}
                            songs={data?.songs}
                        />
                    </div>
                ))}
            </div>

            {/* partie Artist */}
            {dataArtist && dataArtist?.length > 0
                ? (<h2 className='ml-6 text-2xl font-bold text-white mb-6'>Artistes <span className="text-gray-400">({dataArtist.length})</span></h2>)
                : null
            }
            <div className="flex flex-wrap">
                {dataArtist && dataArtist.map((data, index) => (
                    <div className="p-3 m-3" key={`artist_${index}`}>
                        <ArtistCard dataArtist={data} />
                    </div>
                ))}
            </div>

            {/* partie titre */}
            {dataTitle && dataTitle?.length > 0
                ? (<h2 className='ml-6 text-2xl font-bold text-white mb-6'>Titre <span className="text-gray-400">({dataTitle.length})</span></h2>)
                : null
            }
            <div className="flex flex-wrap">
                {dataTitle && dataTitle.map((data, index) => (
                    <div className="p-3 m-3" key={`song_${index}`}>
                        <AlbumCard
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            index={0}
                            songs={data?.songs}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchView