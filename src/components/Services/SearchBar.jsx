import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import selectAlbumData from '../../store/album/albumSelector';
import { BiSearch } from 'react-icons/bi';
import { fetchSearch } from '../../store/album/albumSlice';
import PageLoader from '../Loader/PageLoader';
import SearchView from '../Ui/SearchView';

const SearchBar = () => {

    //on déclare nos state  
    const [searchWord, setSearchWord] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //on récupère le flag loading depuis le store album
    const { loading } = useSelector(selectAlbumData);
    //on récupère le hook pour dispatch 
    const dispatch = useDispatch();

    //méthode pour envoyer le formulaire de recherche 
    const handleSubmit = (e) => {
        e.preventDefault(); // bloque le comportement naturel d'un formulaire
        const search = searchWord.trim()
        if (search === '') {
            setErrorMessage("Veuillez saisir un mot clé.")
        } else if (search.length < 3) {
            setErrorMessage("Veuillez saisir au moins 3 caractères.")
        } else {
            setErrorMessage('')
            dispatch(fetchSearch(search));
        }
    }


    return (
        <>
            <div className="flex flex-col">
                <form
                    onSubmit={handleSubmit}
                    className='p-2 text-gray-500 focus-within:text-gray-600'
                    autoComplete='off'
                >
                    <label className='sr-only text-white'>Quel est votre recherche ?</label>
                    <div className="flex justify-start items-center border-b border-green_top">
                        <BiSearch className='w-5 h-5 ml-4' />
                        <input
                            type="text"
                            className='flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4'
                            placeholder='Rechercher un album, un artiste, ...'
                            autoComplete='off'
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        />
                        <button type="submit" className='bg-green_top hover:bg-green px-4 py-2 text-white p-4 font-bold rounded-md'>Rechercher</button>
                    </div>
                </form>
                <p className="text-red-500 text-base w-full">{errorMessage}</p>
            </div>
            {loading ? <PageLoader /> : <SearchView word={searchWord}/>}
        </>
    )
}

export default SearchBar