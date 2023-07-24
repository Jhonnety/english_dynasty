import { createContext, useEffect, useState } from 'react';
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

interface UserContextProps {
  englishUser: EnglishUser;
  register: (email: string, password: string) => Promise<void>,
  login: (email: string, password: string) => Promise<void>,
  loginWithGoogle: any,
  logOut: () => Promise<void>
}


export const UserContext = createContext<UserContextProps>({
  englishUser: {},
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginWithGoogle: () => { },
  logOut: () => Promise.resolve(),
});

export const UserProvider = ({
  children
}: any) => {
  const [englishUser, setEnglishUser] = useState({});

  const register = async (email: string, password: string) => {
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
  }
  const logOut = async () => {
    const response = await signOut(auth)
    console.log(response)
  }

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("There is not suscribed user")
        setEnglishUser({})
      } else {
        setEnglishUser({
          name:currentUser.displayName,
          email:currentUser.email,
          uid:currentUser.uid,
          url:currentUser.photoURL
        })
      }
    })

    return () => suscribed()
  }, [])
  return (
    <UserContext.Provider value={{ englishUser, register, login, loginWithGoogle, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
