import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'



const Topbar = () => {
    const { nickname } = useAuthContext();
    return (
        <div className='h-16 flex items-center bg-green_top shadow-md'>
            <div className="flex-1 text-white text-lg font-semibold px-4">
                Bonjour {nickname}
            </div>
        </div>
    )
}

export default Topbar