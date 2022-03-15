import useAuth from '../hooks/useAuth';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setToggle}) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  
  return (
    <>
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => setToggle(prev => !prev)}
            className="hover:bg-blue-600 transform transition-all duration-150  cursor-pointer rounded-full p-3"
          >
            <Icon icon="charm:menu-hamburger" className='text-white text-2xl' />
          </div>
          <h1 className='text-white font-bold cursor-pointer' onClick={() => navigate("/")}>WIBA GALLERY</h1>
        </div>
        {auth?.user && (
          <div className="flex items-center space-x-2">
            <p className='text-white'>{auth?.user?.displayName}</p>
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <img src={auth?.user?.photoURL} alt="profile" />
            </div>
          </div>
        )}
    </>
  )
}

export default Navbar;