import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchArtistDetail } from '../../store/artist/artistSlice';
import PageLoader from '../../components/Loader/PageLoader';
import HeaderDetail from '../../components/DetailArtist/HeaderDetail';
import BiographyArtist from '../../components/DetailArtist/BiographyArtist';
import ListAlbumArtist from '../../components/DetailArtist/ListAlbumArtist';

const ArtistDetail = () => {
    // on doit recuperer l'id de l'artiste depuis l'url
    const params = useParams();
    const { id } = params;

    // on recupère le hook dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtistDetail(id))

    }, [dispatch, id])

    //on recupère les datas de l'artiste depuis le store
    const { loading, artistDetail } = useSelector((state) => state.artists);
    return (
        loading ? <PageLoader /> :
            <>
                <HeaderDetail dataArtist={artistDetail} />
                <BiographyArtist dataArtist={artistDetail} />
                <ListAlbumArtist dataArtist={artistDetail} />
            </>
    )
}

export default ArtistDetail