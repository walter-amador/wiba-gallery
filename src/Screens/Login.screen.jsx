import { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth as firebaseAuth, provider } from '../firebase/auth';
import useAuth from '../hooks/useAuth';

//login
const Login = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const signInWithGoogle = () =>{
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                const user = result.user;
                setAuth({user});
                navigate(from, { replace: true });
            })
            .catch((error) =>{console.log(error)});
    }

    useEffect(() => {
      if(auth?.user) {
          navigate("/");
      }
    }, [navigate, auth])
    

    return (
        <div className='h-full w-full flex-1 flex flex-col md:flex-row justify-center items-center'>

            <div className="flex-1 h-full hidden md:flex justify-center items-center">
                <img className='object-contain w-4/5' src="/login-img-1.svg" alt="Login img 1" />
            </div>
            <div className="flex-1 md:h-full flex items-center justify-center">
                <div className="border-2 border-blue-500 flex flex-col items-center justify-evenly md:justify-start md:py-16 px-8 rounded-xl md:space-y-16 shadow-md h-4/5 max-w-md">
                    <h2 className="font-bold text-blue-500 text-6xl">LOGIN</h2>
                    <p className="text-gray-700">Inicia Sesión o Registrate con Google</p>
                    <button className='bg-white border border-blue-500 shadow-md rounded-xl px-8 py-2 flex items-center space-x-4' onClick={signInWithGoogle}>
                        <span className="w-6 h-6">
                            <img className='object-contain w-6 h-6' src='/google-icon.png' alt="Google icon" />
                        </span>
                        <span className="text-blue-500">
                            Continuar con Google
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex md:hidden justify-center items-center">
                <img src="/login-img-2.svg" alt="Login img 2" className="object-contain w-4/5" />
            </div>

        </div>
    )
}

export default Login