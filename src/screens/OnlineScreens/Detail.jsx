import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumDetail } from '../../store/album/albumSlice';
import { useParams } from 'react-router-dom';
import selectAlbumData from '../../store/album/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import DetailAlbum from '../../components/DetailAlbum';

const Detail = () => {

  //const pour récupérer l'id 
  const params = useParams();

  const { id } = params;

  //on récupère le hook dispatch pour pouvoir executer les actions du slice
  const dispatch = useDispatch();

  useEffect(() => {
    // on dispatch la méthode fetchAlbumDetail pour récupérer les albums en bdd
    dispatch(fetchAlbumDetail(id));
  }, [dispatch, id])

  //on récupère les données des détails de l'albums et le loading avec useSelector
  const { loading, albumDetail } = useSelector(selectAlbumData);

  return (
    loading ? <PageLoader /> : <DetailAlbum dataAlbum={albumDetail} />
  )
}

export default Detail