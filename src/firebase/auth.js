import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';

export const provider = new GoogleAuthProvider();

//authentication
export const auth = getAuth(app);

export const isUserLogged = () => {
    return auth.currentUser ? true : false;
}

export const getCurrentUserInfo = () => {
    return auth.currentUser;
}