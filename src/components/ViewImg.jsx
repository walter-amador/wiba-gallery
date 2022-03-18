import { Icon } from '@iconify/react';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react'
import { deleteFile } from '../firebase/firestore';
import { storage } from '../firebase/storage';
import useAuth from '../hooks/useAuth';

const ViewImg = ({viewImg, changeViewImg, closeModal}) => {
    const { auth } = useAuth();
    
    const deleteImage = () => {
        const storageRef = ref(storage, `images/${auth.user.uid}/${viewImg.imageName}`);
        
        deleteObject(storageRef)
            .then(() => {
                deleteFile(viewImg.id)
                    .then(() => {
                        closeModal();
                        alert('Successfully deleted image');
                    })
                    .catch(error => {
                        alert("Something went wrong, try again later...");
                    })
            })
            .catch(() => {
                alert("Something went wrong, try again later...");
            })
    }

  return (
    <div className="w-full h-full md:w-3/5 md:h-4/6">
        <div className="relative w-full h-full">
            <div className="flex justify-center md:space-x-2 h-full">
                <div className="md:h-full absolute bottom-6 left-4 z-20 md:static flex items-center cursor-pointer" onClick={() => changeViewImg(viewImg.imgIndex, -1)}>
                    <Icon className='text-5xl text-slate-300' icon="zondicons:cheveron-outline-left"/>
                </div>
                <div className="bg-slate-900 flex-1 h-full">
                    <img className='w-full h-full object-contain' src={viewImg.imgURL} alt="" />
                </div>
                <div className="md:h-full absolute bottom-6 right-4 z-20 md:static flex items-center cursor-pointer" onClick={() => changeViewImg(viewImg.imgIndex, 1)}>
                    <Icon className='text-5xl text-slate-300' icon="zondicons:cheveron-outline-right"/>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-2 absolute inset-x-0 bottom-4 md:bottom-0">
                <button>
                    <Icon className='cursor-pointer text-5xl md:text-2xl text-slate-400' icon="akar-icons:info-fill"/>
                </button>
                <button className='hover:scale-110 transition-all duration-100' onClick={deleteImage}>
                    <Icon className='cursor-pointer text-5xl md:text-2xl text-slate-400' icon="fluent:delete-24-filled"/>
                </button>
                <button>
                    <Icon className='cursor-pointer text-5xl md:text-2xl text-slate-400' icon="fa-solid:download"/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ViewImg;