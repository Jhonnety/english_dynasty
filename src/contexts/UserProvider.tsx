import { createContext, useContext, useEffect, useState } from 'react';
import { EnglishUser } from '../models';
import { auth } from '../firebase/Initialization';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { useMessage } from '../hooks/useMessage';
import { AuthContext } from '.';

const { message } = useMessage();
interface UserContextProps {
  englishUser: EnglishUser;
  signUp: (email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  loginWithGoogle: any,
  logOut: () => Promise<void>
}


export const UserContext = createContext<UserContextProps>({
  englishUser: {},
  signUp: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginWithGoogle: () => { },
  logOut: () => Promise.resolve(),
});

export const UserProvider = ({
  children
}: any) => {
  const [englishUser, setEnglishUser] = useState({});
  const { closeAll } = useContext(AuthContext);
  
  const signUp = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response)
  }
  const login = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response)
  }
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle)
      .then(() => 
      {
        closeAll();
        message({
          kind: 'success',
          title: 'Login Successful',
          paragraph: 'Welcome back! You have been successfully logged in.',
        });
      })
      .catch((error) => {
        message({
          kind: 'error',
          title: 'Login Failed',
          paragraph: "We couldn't log you in. Please check your credentials and try again.",
          error: error
        });
      });
  }
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        message({
          kind: 'success',
          title: 'Logged Out Successfully',
          paragraph: 'You have been successfully logged out. Thank you for using our services!',
        });
      })
      .catch((error) => {
        message({
          kind: 'error',
          title: 'Logout Failed',
          paragraph: 'Sorry, we encountered an error while trying to log you out. Please try again later.',
          error: error
        });
      });
  };

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("There is not suscribed user")
        setEnglishUser({})
      } else {
        setEnglishUser({
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          url: currentUser.photoURL
        })
      }
    })

    return () => suscribed()
  }, [])
  return (
    <UserContext.Provider value={{ englishUser, signUp, login, loginWithGoogle, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
