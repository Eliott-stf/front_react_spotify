import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import { BiTime } from 'react-icons/bi';
import { tableIcon } from '../../constants/appConstant';
import PlayPause from '../Services/PlayPause';

const ListAlbumSong = ({ dataAlbum }) => {

    const data = dataAlbum;
    const songs = dataAlbum?.songs;

    //on déclare nos state
    const [isHover, setIsHover] = useState(-1); // quand la souris sera sur une piste 
    const [songId, setSongId] = useState(null); //pour récupérer l'id de la chanson 

    //on récupère les données du store 
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    //le hook
    const dispatch = useDispatch();

    //méthode pour mettre pause
    const handlePauseClic = () => {
        dispatch(playPause(false));
    }

    //méthode pour mettre play
    const handlePlayClic = (index) => {
        dispatch(setActiveSong({ songs, data, index }))
        dispatch(setActiveAlbum({ data }))
        dispatch(playPause(true))
    }




    return (
        <div className="flex flex-col px-4 sm:px-6 lg:px-8 pb-8">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-white_01">
                            <th className='pb-3 pt-1 w-12 text-gray-400 font-normal text-sm' scope='col'>
                                #
                            </th>

                            <th className='pb-3 pt-1 w-12 text-gray-400 font-normal text-sm' scope='col'>
                                TITRE
                            </th>

                            <th className='pb-3 pt-1 w-12 text-gray-400 font-normal text-sm text-right' scope='col'>
                                <BiTime style={tableIcon} className='inline-block' />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs && songs.map((row, index) => {
                            const minutes = Math.floor(row.duration / 60);
                            const seconds = Math.floor(row.duration % 60);
                            const duration = seconds < 10
                                ? `${minutes}:0${seconds}`
                                : `${minutes}:${seconds}`;

                            const isActive = activeSong?.title === row?.title && isPlaying
                            return (
                                <tr
                                    className={`border-b border-white/5 transition-colors group ${isActive ? 'text-green' : 'text-gray-300 hover:text-white'}`}
                                    key={row.id ?? index}
                                    onMouseEnter={() => setIsHover(index)}
                                    onMouseLeave={() => setIsHover(-1)}
                                >
                                    <td className="py-3 pr-2 align-middle w-12">
                                        {isHover !== index ? (
                                            <span className="text-sm">{index + 1}</span>
                                        ) : (
                                            <PlayPause
                                                size='26px'
                                                songs={songs}
                                                handlePlay={() => handlePlayClic(index)}
                                                handlePause={handlePauseClic}
                                                index={index}
                                                isPlaying={isPlaying}
                                                activeSong={activeSong}
                                                data={data}
                                            />
                                        )}
                                    </td>
                                    <td className="py-3 font-medium">{row.title}</td>
                                    <td className="py-3 w-14 text-right text-sm text-gray-400 tabular-nums">{duration}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListAlbumSong