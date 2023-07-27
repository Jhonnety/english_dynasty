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
  FacebookAuthProvider
} from 'firebase/auth'
import { useMessage } from '../hooks/useMessage';
import { AuthContext } from '.';

const { createMessage, messageSuccessLogin, messageUserOrPasswordError } = useMessage();
interface UserContextProps {
  englishUser: EnglishUser;
  signUp: (email: string, password: string, onResetForm: () => void) => Promise<void>,
  login: (email: string, password: string, onResetForm: () => void) => Promise<void>,
  loginWithGoogle: any,
  loginWithFacebook: any,
  logOut: () => Promise<void>
}


export const UserContext = createContext<UserContextProps>({
  englishUser: {},
  signUp: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginWithGoogle: () => { },
  logOut: () => Promise.resolve(),
  loginWithFacebook: () => { }
});

export const UserProvider = ({
  children
}: any) => {
  const [englishUser, setEnglishUser] = useState({});
  const { closeAll } = useContext(AuthContext);

  const signUp = async (email: string, password: string, onResetForm: () => void) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        closeAll();
        createMessage({
          kind: 'success',
          title: 'Signed Up Successfully',
          paragraph: 'You have been successfully signed up. Thank you for using our services!',
        });
      })
      .catch(({ code }) => {
        onResetForm();
        if (code == 'auth/email-already-in-use') {
          createMessage({
            kind: 'error',
            title: 'Sign up failed',
            paragraph: "The email is already in use. You can login! ",
          });
        }
        else {
          createMessage({
            kind: 'error',
            title: 'Login failed',
            paragraph: "We couldn't log you in. Please check your credentials and try again.",
          });
        }
      });

  }
  const login = async (email: string, password: string, onResetForm: () => void) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        closeAll();
        messageSuccessLogin();
      })
      .catch(({ code }) => {
        onResetForm();
        if (code == 'auth/user-not-found' || code == 'auth/wrong-password') {
          messageUserOrPasswordError();
        }
        else {
          createMessage({
            kind: 'error',
            title: 'Login failed',
            paragraph: "We couldn't log you in. Please check your credentials and try again.",
          });
        }
      })
  }
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle)
      .then(() => {
        closeAll();
        messageSuccessLogin();
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Login Failed',
          paragraph: "We couldn't log you in. Please check your credentials and try again.",
          error: code
        });
      });
  }
  const loginWithFacebook = async () => {
    const responseFacebook = new FacebookAuthProvider();
    return await signInWithPopup(auth, responseFacebook)
      .then(() => {
        closeAll();
        messageSuccessLogin();
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Login Failed',
          paragraph: "We couldn't log you in. Please check your credentials and try again.",
          error: code
        });
      });
  }
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        createMessage({
          kind: 'success',
          title: 'Logged Out Successfully',
          paragraph: 'You have been successfully logged out. Thank you for using our services!',
        });
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Logout Failed',
          paragraph: 'Sorry, we encountered an error while trying to log you out. Please try again later.',
          error: code
        });
      });
  };

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
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
    <UserContext.Provider value={{ englishUser, signUp, login, loginWithGoogle, logOut, loginWithFacebook }}>
      {children}
    </UserContext.Provider>
  );
};
