import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import { Icon } from '@iconify/react';
import { storage } from '../firebase/storage';
import useAuth from '../hooks/useAuth';
import { sendFile } from '../firebase/firestore';


//upload
const Upload = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(null);
    const { auth } = useAuth();

    const handleChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const src = URL.createObjectURL(file);
            setImage(src);
        }
    }

    const clearImg = () => {
        document.getElementById('imageId').value = null;
        setImage(null);
        setUploading(null);
    }

    const handleUpload = () => {
        const uuid = create_UUID();
        const file = document.getElementById('imageId').files[0];
        const fileType = file.type.split('/')[1];
        const imageName = `${uuid}.${fileType}`;
        const storageRef = ref(storage, `images/${auth.user.uid}/${imageName}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploading(Math.round(progress));
            },
            (error) => {
                alert("Something went wrong, try again later...");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    
                    sendFile(auth.user.uid, downloadURL, imageName)
                        .then((res) => {
                            clearImg();
                            alert("Uploaded successfully!")
                        })
                        .catch((err) => {
                            alert("Something went wrong, try again later...");
                        })
                });
            }
        );
    }

  return (
    <div className="w-full h-full md:w-2/5 md:h-4/6">
        <div className="w-full h-full bg-white mx-auto flex flex-col md:rounded-md p-4">
            <div className="h-5/6">
                {
                    image ? (
                        <div className="w-full h-full relative">
                            <img className='w-full h-full object-contain' src={image} alt="selected" />
                            {
                                uploading && (
                                    <div className="absolute inset-0 bg-opacity-60 bg-white">
                                        <CircularProgress percent={uploading} />
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <label htmlFor="imageId">
                            <div className="w-full h-full border-dashed border-2 border-blue-500 rounded-md flex flex-col justify-center items-center cursor-pointer">
                                <Icon className='text-7xl text-blue-500' icon="bxs:cloud-upload" />
                                <p className='text-blue-500'>Click here to select file</p>
                            </div>
                        </label>
                    )
                }
                <input 
                    id='imageId'
                    name='imageId'
                    type="file"
                    max={1}
                    accept='image/png, image/jpeg, image/jpg'
                    className='hidden'
                    onChange={handleChange}
                />
            </div>
            {
                (image && !uploading) && (
                    <div className="flex justify-between mt-4">
                        <button
                            type='button'
                            onClick={clearImg}
                            className="flex items-center space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-red-400"
                        >
                            <Icon icon="ic:round-cancel-presentation"/>
                            <span>Cancel</span>
                        </button>
                        <label htmlFor='imageId' className="flex items-center cursor-pointer space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-blue-400">
                            <Icon icon="dashicons:edit-large"/>
                            <span>Change Image</span>
                        </label>
                        <button onClick={handleUpload} type='button' className="flex items-center space-x-2 px-2 py-1 shadow shadow-slate-400 text-white text-lg rounded-md bg-green-400">
                            <Icon icon="bxs:cloud-upload"/>
                            <span>Upload</span>
                        </button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Upload;

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c ==='x' ? r :((r & 0x3) | 0x8)).toString(16);
    });
    return uuid;
}

const CircularProgress = ({percent = 0}) => {
    const circumference = 54 * 2 * Math.PI
    return(
        <div
            className="absolute inset-0 inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
        >
            <svg className="w-32 h-32">
                <circle
                    className="text-gray-300"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="64"
                    cy="64"
                />
                <circle
                    className="text-blue-600"
                    strokeWidth="5"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${circumference - percent / 100 * circumference}`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="54"
                    cx="64"
                    cy="64"
                />
            </svg>
            <span className="absolute text-xl text-blue-700">{percent}%</span>
        </div>
    );
}