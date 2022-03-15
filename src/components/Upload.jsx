import { Icon } from '@iconify/react';

const Upload = () => {
  return (
    <div className="w-2/5 h-4/6">
        <div className="w-full h-full mx-auto flex flex-col">
            <div className=" bg-white h-5/6">
            <img className='w-full h-full object-contain' src="http://via.placeholder.com/250x250" alt="" />
            </div>
            <div className="flex justify-between mt-4">
            <button type='button' className="flex items-center space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-red-400">
                <Icon icon="ic:round-cancel-presentation"/>
                <span>Cancel</span>
            </button>
            <button type='button' className="flex items-center space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-blue-400">
                <Icon icon="dashicons:edit-large"/>
                <span>Change Image</span>
            </button>
            <button type='button' className="flex items-center space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-green-400">
                <Icon icon="bxs:cloud-upload"/>
                <span>Upload</span>
            </button>
            </div>
        </div>
    </div>
  )
}

export default Upload;