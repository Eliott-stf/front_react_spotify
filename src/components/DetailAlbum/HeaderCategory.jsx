import React from 'react'
import { Link } from 'react-router-dom';

const HeaderCategory = ({ dataAlbum }) => {


    const categories = dataAlbum?.genre;


    return (
        <div className="flex flex-wrap items-center gap-2 mt-4">
            {categories && categories.map((category, index) => (
                <Link
                    to={"#"}
                    key={index}
                    className='px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-white_01 text-gray-300 hover:bg-green/20 hover:text-white transition'
                >
                    {category?.label}
                </Link>
            ))}
        </div>
    )
}

export default HeaderCategory