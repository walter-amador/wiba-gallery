import React from 'react'

const Dev = ({name, img, desc, bgColor}) => {
  return (
    <div className="bg-white shadow-lg w-96 rounded-2xl overflow-hidden p-4">
        <div className={`w-64 h-64 rounded-full overflow-hidden shadow-md mx-auto ${bgColor} flex justify-center items-center`}>
            <img className='w-full h-full object-contain' src={img} alt="" />
        </div>
        <div className="text-center mt-4">
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className='text-slate-600 italic text-sm'>{desc}</p>
        </div>
    </div>
  )
}

export default Dev;