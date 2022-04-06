import { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

//Hooks.
import useAuth from '../hooks/useAuth';
import useOnScreen from '../hooks/useOnScreen';

//Components.
import ImageItem from '../components/ImageItem';
import Modal from '../components/Modal';
import Upload from '../components/Upload';

//Firebase.
import { getImages } from '../firebase/firestore';
import ViewImg from '../components/ViewImg';

const Gallery = () => {
  const { auth } = useAuth();
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [uploadImg, setUploadImg] = useState(false);
  const [viewImg, setViewImg] = useState(null);
  const [ files, setFiles ] = useState([]);

  const closeModal = () => {
    setUploadImg(false);
    setViewImg(null);
  }

  useEffect(() => {
    getImages(auth.user.uid, setFiles);
  }, []);

  const handleClickImg = (id) => {
    const img = {...files.filter((file) => file.id === id)[0]};
    const imgIndex = files.map(files => files.id).indexOf(id)
    
    setViewImg({...img, imgIndex});
  }
  
  const changeViewImg = (index, direction) => {
    if((index === 0 && direction === -1) || (index === files.length -1 && direction === 1)){
      return;
    }
    const nextIndex = index + direction;
    const img = {...files[nextIndex]};

    setViewImg({...img, imgIndex: nextIndex});
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div className="flex w-full justify-between mb-4">
        <div className="">
          <h2 className="font-bold text-4xl">My Gallery</h2>
        </div>
        <div className="">
          <div
            onClick={() => setUploadImg(true)}
            ref={ref}
            className={`hidden md:flex cursor-pointer items-center justify-evenly overflow-hidden 
            rounded-2xl bg-white shadow-md text-lg font-medium md:w-36 w-14 h-14 
            hover:shadow-sm transition-all duration-150 sticky top-16
            `}>
            <img src="/add.svg" alt="upload" />
            <span className={`hidden md:flex`}>Upload</span>
          </div>
          <div 
            onClick={() => setUploadImg(true)}
            className={`flex ${isVisible && 'md:h-0 md:w-0 md:p-0'} cursor-pointer items-center justify-center rounded-full overflow-hidden p-2 bg-white shadow-md
            fixed bottom-4 right-8 z-10 transition-all duration-100`}>
            <img src="/add.svg" alt="upload" />
          </div>
        </div>
      </div>
      {
        files.length === 0 && (
          <h2>No images found</h2>
        )
      }
      <div className="grid items-center justify-items-center gap-0 grid-cols-3 md:gap-4 md:grid-cols-auto-fill transform transition-all duration-100">
        {
          files.map((file) => {
            return(
              <ImageItem key={file.id} img={file.imgURL} fileId={file.id} handleClick={handleClickImg} />
            );
          })
        }
      </div>
      {
        (uploadImg || viewImg) &&
        <Modal
          bgClick={closeModal}
        >
          {
            uploadImg && (
              <Upload />
            )
          }
          {
            viewImg && (
              <ViewImg closeModal={closeModal} viewImg={viewImg} changeViewImg={changeViewImg} />
            )
          }
        </Modal>
      }
    </section>
  )
}

export default Gallery;