import { useState, useEffect } from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';

//Components
import Page from './components/Page';
import Navbar from './components/Navbar';
import Main from './components/Main';

//Screens
import Login from './Screens/Login.screen';
import Gallery from './Screens/Gallery.screen';
import TermsConditions from './Screens/TermsConditions.screen';

//Utils
import RequireAuth from './components/RequireAuth';
import { auth as firebaseAuth } from './firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import useAuth from './hooks/useAuth';
import PrivacyPolicy from './Screens/PrivacyPolicy.screen';
import Developers from './Screens/Developers.screen';

const App = () => {
  const [toggle, setToggle ] = useState(false);
  const [ user ] = useAuthState(firebaseAuth);
  const { setAuth } = useAuth();

  useEffect(() => {
    if(user !== null) {
      setAuth({user})
    }
  }, [user, setAuth])
  

  return (
    <Page
      header={<Navbar setToggle={setToggle} />}
    >
      <Main toggle={toggle} setToggle={setToggle}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Gallery />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/terms-and-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/developers' element={<Developers />} />
        </Routes>
      </Main>
    </Page>
  );
}

export default App;
