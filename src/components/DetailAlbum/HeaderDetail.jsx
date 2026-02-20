import React from 'react'
import { ALBUMS_URL } from '../../constants/apiConstant'
import HeaderInfo from './HeaderInfo';
import HeaderCategory from './HeaderCategory';

const HeaderDetail = ({ dataAlbum }) => {

    const imgAlbum = `${ALBUMS_URL}/${dataAlbum?.imagePath}`;

    return (
        <div className='w-full bg-linear-to-b from-green_top/30 via-green_top/10 to-transparent px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pb-10 '>
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
                <div className="shrink-0">
                    <img src={imgAlbum} alt={`image de l'album ${dataAlbum?.title}`} className='w-44 h-44 sm:w-52 sm:h-52 lg:h-56 lg:w-56 rounded-lg object-cover shadow-2xl shadow-black/50 ring-1 ring-white_01'/>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full min-w-0">
                    <h1 className='title-h1'>{dataAlbum?.title}</h1>
                    <HeaderInfo dataAlbum={dataAlbum} />
                    <HeaderCategory dataAlbum={dataAlbum}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderDetail