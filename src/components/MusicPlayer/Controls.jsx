import React from 'react'
import { BsFillPauseFill, BsFillPlayFill, BsRepeat, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

const Controls = ({ isPlaying, currentSongs, isActive, repeat, shuffle, setRepeat, setShuffle, handlePlayPause, handleNextSong, handlePrevSong }) => {
    return (
        <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
            {/* Bouton repeat */}
            <BsRepeat
                size={18}
                color={repeat ? 'rgba(30,215,96,1)' : '#fff'}
                className='cursor-pointer'
                onClick={() => setRepeat(!repeat)}
            />
            {/* on affiche le bouton précedent si on a un tableau de chanson supérieur > 1  */}
            <MdSkipPrevious
                size={30}
                color={currentSongs?.length > 1 ? '#fff' : '#888'}
                className={`${currentSongs?.length > 1
                        ? 'cursor-pointer'
                        : 'opacity-50'
                    }`}
                onClick={currentSongs?.length > 1 ? handlePrevSong : undefined}
            />
            {/* on affiche le bouton playPause */}
            {isPlaying && isActive
                ? (
                    //On affiche le btn pause
                    <BsFillPauseFill
                        size={45}
                        color='#fff'
                        className='cursor-pointer'
                        onClick={handlePlayPause}
                    />
                )
                : (
                    //On affiche le btn play
                    <BsFillPlayFill
                        size={45}
                        color='#fff'
                        className='cursor-pointer'
                        onClick={handlePlayPause}
                    />
                )}

            {/* on affiche le bouton suivant si on a un tableau de chanson supérieur > 1  */}
            {currentSongs?.length > 1 &&
                <MdSkipNext
                    size={30}
                    color='#fff'
                    className='cursor-pointer'
                    onClick={handleNextSong}
                />
            }

            {/* Bouton shuffle */}
            <BsShuffle
                size={18}
                color={shuffle ? 'rgba(30,215,96,1)' : '#fff'}
                className='cursor-pointer'
                onClick={() => setShuffle(!shuffle)}
            />
        </div>
    )
}

export default Controls