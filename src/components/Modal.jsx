import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const Modal = ({bgClick,children}) => {
    const modal = useRef(null);

    useEffect(() => {
        window.onclick = function(event) {
            if (event.target === modal.current) {
                bgClick();
            }
          }

    }, [bgClick]);

    const handleClose = (e) => {
        e.preventDefault();
        bgClick();
    }
    
  return (
    <section ref={modal} style={{backgroundColor: 'rgba(0,0,0,0.2)'}} className='fixed z-10 inset-0 flex justify-center items-center'>
        <button type='button' className="bg-white rounded-full p-2 absolute top-16 right-16" onClick={handleClose} >
            <Icon icon="ep:close"/>
        </button>
        {children}
    </section>
  )
}

export default Modal;