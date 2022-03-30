import React from 'react'

const Tutorials = () => {
  return (
    <div className='flex flex-col justify-center items-center md:h-full'>
      <h1 className='text-3xl font-bold mb-4'>How to use WIBA Gallery</h1>
      <iframe className='w-full min-h-[250px] md:w-3/4 md:h-[500px]' src="https://www.youtube.com/embed/YRNyamyBOIQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  )
}

export default Tutorials;