import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAlbumDetail } from '../../store/album/albumSlice';
import HeaderDetail from './HeaderDetail';
import ToolbarDetail from './ToolbarDetail';
import ListAlbumSong from './ListAlbumSong';
import AlbumSuggestion from './AlbumSuggestion';

const DetailAlbum = ({ dataAlbum, albumByGenre }) => {



    return (
        <>
            <HeaderDetail dataAlbum={dataAlbum} />
            <ToolbarDetail dataAlbum={dataAlbum} />
            <ListAlbumSong dataAlbum={dataAlbum} />
            <AlbumSuggestion albumByGenre={albumByGenre}/>
        </>
    )
}

export default DetailAlbum