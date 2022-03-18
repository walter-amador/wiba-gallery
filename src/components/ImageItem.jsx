import React from 'react'

const ImageItem = ({img, fileId, handleClick}) => {
  return (
    <div 
      onClick={() => handleClick(fileId)}
      className="w-full h-full min-h-[144px] max-h-36 md:max-h-min md:w-60 md:h-60 md:shadow-md md:rounded-md 
      bg-slate-400 flex justify-center items-center overflow-hidden 
      hover:scale-105 cursor-pointer transform transition-all duration-75"
    >
        <img className='object-contain w-full h-full' src={img} alt="gallery item" />
    </div>
  )
}

export default ImageItem;