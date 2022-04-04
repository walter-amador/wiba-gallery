import React from 'react'

const Tutorials = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-8'>
      <div className="flex flex-col items-center w-full">
        <h2 className='text-3xl font-bold mb-4'>How to use WIBA Gallery</h2>
        <iframe className='w-full min-h-[250px] md:w-3/4 md:h-[500px]' src="https://www.youtube.com/embed/5TnvEhSomeM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className='text-3xl font-bold mb-4'>Frequent Asked Questions</h2>
        <ol className='list-decimal'>
          <li className='font-bold'>
            <span className="block">Is a Google account required to access the app?</span>
            <span className="block font-normal">A// If necessary, since the authentication and security of the accounts are done through Google authentication.</span>
          </li>
          <li className='font-bold'>
            <span className="block">Who will see my photos?</span>
            <span className="block font-normal">A// WIBA Gallery chooses to be the most secure gallery currently, therefore neither other users nor the WIBA Gallery team will be able to see your photos.</span>
          </li>
          <li className='font-bold'>
            <span className="block">Does this app collect my data anonymously?</span>
            <span className="block font-normal">A// Of course not, no user information is collected.</span>
          </li>
          <li className='font-bold'>
            <span className="block">If I upload a photo that I didn't want, what can I do?</span>
            <span className="block font-normal">A// By clicking on the image that you didn't want to upload, you can delete it by clicking the trash can icon at the bottom of the image.</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Tutorials;