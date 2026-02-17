import React from 'react'

const CustomInput = ({ label, state, type, placeholder = '', callable }) => {
  return (
    <div className="mb-5">
        <label className='block text-chite font-semiboldmt-2 text-sm'>{label}</label>
        <input 
        className='w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-white_01 text-white placeholder-gray-500 focus:outline-none focus:border-green focus:ring-green/30 focus:ring-2 transition duration-200'
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={callable}
        />
    </div>
  )
}

export default CustomInput