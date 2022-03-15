import React from 'react'

const ImageItem = ({img}) => {
  return (
    <div className="w-full h-full md:w-60 md:h-60 md:shadow-md md:rounded-md bg-slate-500 flex justify-center items-center overflow-hidden hover:scale-105 cursor-pointer transform transition-all duration-75">
        <img className='object-contain w-full h-full' src="http://via.placeholder.com/250x250" alt="gallery item" />
    </div>
  )
}

export default ImageItem;