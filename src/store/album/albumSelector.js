import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;
const selectAlbumByGenre = (state) => state.albums.albumByGenre

const selectAlbumData = createSelector(
    [selectLoading, selectAlbums, selectAlbumDetail, selectAlbumByGenre],
    (loading, albums, albumDetail, albumByGenre) => ({ loading, albums, albumDetail, albumByGenre })
)

export default selectAlbumData;