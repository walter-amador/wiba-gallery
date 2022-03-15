import { signOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SideBarItem from './SideBarItem';

const Main = ({toggle, setToggle, children}) => {
    const { auth, setAuth } = useAuth();
    
    const navigate = useNavigate();
  
    const logoutApp = () =>{
        setToggle(false)
        signOut(firebaseAuth);
        setAuth({});
        navigate('login');
    }
    
    return (
        <div className="flex h-full items-stretch">
            <div className={`${toggle ? 'w-full md:w-1/5' : 'w-0'} overflow-hidden transform transition-all duration-200 shadow-lg shadow-slate-700`}>
                <ul className="px-2 py-4">
                    { auth?.user &&
                        <SideBarItem
                            icon="clarity:image-gallery-solid" 
                            desc="My Gallery" 
                            func={() => navigate('/')}
                        />
                    }
                    { !auth?.user &&
                        <SideBarItem
                            icon="icon-park-outline:login" 
                            desc="Login" 
                            hoverBgColor="bg-green-200"
                            func={() => navigate('/login')}
                        />
                    }
                    <SideBarItem
                        icon="ic:baseline-privacy-tip" 
                        desc="Terms and conditions" 
                        func={() => navigate('/conditions')}
                    />
                    <SideBarItem
                        icon="icon-park-outline:personal-privacy" 
                        desc="Privacy policy" 
                        func={() => navigate('/privacy')}
                    />
                    <SideBarItem
                        icon="fluent:contact-card-16-regular" 
                        desc="Developers" 
                        func={() => navigate('/developers')}
                    />
                    {
                        auth?.user &&
                        <SideBarItem
                            icon="icon-park-outline:logout" 
                            desc="Logout"
                            func={logoutApp}
                        />
                    }
                </ul>
            </div>
            <div
                className={`flex-1 overflow-x-hidden overflow-y-auto ${toggle? 'md:px-8' : 'px-4 md:px-16'} py-8 transition-all duration-150`}
            >
                {children}
            </div>
        </div>
    );
}

export default Main;