import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;
const selectAlbumByGenre = (state) => state.albums.albumByGenre
const selectSearchAlbum = (state) => state.albums.searchAlbum;
const selectSearchTitle = (state) => state.albums.searchTitle;
const selectSearchArtist = (state) => state.albums.searchArtist;


const selectAlbumData = createSelector(
    [selectLoading, selectAlbums, selectAlbumDetail, selectAlbumByGenre, selectSearchAlbum, selectSearchTitle, selectSearchArtist],
    (loading, albums, albumDetail, albumByGenre, searchAlbum, searchTitle, searchArtist) => ({ loading, albums, albumDetail, albumByGenre, searchAlbum, searchTitle, searchArtist })
)

export default selectAlbumData;