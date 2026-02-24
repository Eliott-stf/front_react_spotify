import React from 'react'
import parse from 'html-react-parser'
import { RiArticleLine } from 'react-icons/ri'
import { styleIcon } from '../../constants/appConstant'

const BiographyArtist = ({ dataArtist }) => {
    const bio = dataArtist?.biography
        ? parse(dataArtist.biography)
        : null;

    return (
        <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
            <div className='max-w-3xl rounded-2xl bg-white/5 border border-white/10 overflow-hidden'>
                <h2 className='text-lg font-bold text-white px-5 py-4 border-b border-white/10 flex items-center gap-2'>
                    <RiArticleLine className='text-green' style={styleIcon} />
                    Biographie
                </h2>
                <div className='p-5 text-gray-300 text-sm leading-relaxed'>
                    {bio ?? (
                        <span className='text-gray-500'>Biographie non disponible.</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BiographyArtist