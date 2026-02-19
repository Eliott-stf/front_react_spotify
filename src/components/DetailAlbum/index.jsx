import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAlbumDetail } from '../../store/album/albumSlice';
import HeaderDetail from './HeaderDetail';

const DetailAlbum = ({ dataAlbum }) => {



    return (
        <>
            <HeaderDetail dataAlbum={dataAlbum} />
            
        </>
    )
}

export default DetailAlbum