import React, { useEffect } from 'react'
import SearchBar from '../../components/Services/SearchBar'
import { useDispatch } from 'react-redux'
import { fetchResetSearch } from '../../store/album/albumSlice';

const Search = () => {

  //on récup le hook
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResetSearch());
  }, [])

  return (
    <SearchBar />
  )
}

export default Search