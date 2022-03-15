import { useRef, useState } from 'react';
import ImageItem from '../components/ImageItem';
import useOnScreen from '../hooks/useOnScreen';
import Modal from '../components/Modal';
import { Icon } from '@iconify/react';
import Upload from '../components/Upload';

const Gallery = () => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  const [uploadImg, setUploadImg] = useState(false);
  const [viewImg, setViewImg] = useState(false);

  const closeModal = () => {
    setUploadImg(false);
    setViewImg(false);
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
      <div className="grid items-center justify-items-center gap-0 grid-cols-3 md:gap-4 md:grid-cols-auto-fill transform transition-all duration-100">
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
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
              <div className="bg-white">
                <div className="">
                  <div className=""></div>
                  <div className=""></div>
                  <div className=""></div>
                </div>
                <div className="">
                  <Icon icon="akar-icons:info-fill"/>
                  <Icon icon="fluent:delete-24-filled"/>
                  <Icon icon="fa-solid:download"/>
                </div>
              </div>
            )
          }
        </Modal>
      }
    </section>
  )
}

export default Gallery;