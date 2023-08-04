import { createContext, useContext, useEffect, useState } from 'react';
import { EnglishUser } from '../models';
import { auth, db } from '../firebase/Initialization';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth'
import { useMessage } from '../hooks/useMessage';
import { AuthContext } from '.';
import { ButtonLoadingContext } from './ButtonLoadingProvider';
import { collection, query, where, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

const MAX_CREDIT = parseInt(import.meta.env.VITE_MAX_CREDIT);

const { createMessage, messageSuccessLogin, messageUserOrPasswordError, sendVerificationEmail, unexpectedError } = useMessage();
interface UserContextProps {
  englishUser: EnglishUser;
  signUp: (email: string, password: string, onResetForm: () => void) => Promise<void>,
  login: (email: string, password: string, onResetForm: () => void) => Promise<void>,
  loginWithGoogle: any,
  loginWithFacebook: any,
  logOut: () => Promise<void>,
  resetPassword: (email: string, onResetForm: () => void) => Promise<void>,
  changeProfilePhoto: (url: string) => void,
  minusCredits: (credits: number, lastCreditDate: string) => void,
  addCredits: (newCredits: number, credits: number, idForm: string, newDate: string) => void,
}


export const UserContext = createContext<UserContextProps>({
  englishUser: {},
  signUp: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginWithGoogle: () => { },
  logOut: () => Promise.resolve(),
  loginWithFacebook: () => { },
  resetPassword: () => Promise.resolve(),
  changeProfilePhoto: () => { },
  minusCredits: () => { },
  addCredits: () => { },
});

export const UserProvider = ({
  children
}: any) => {
  const [englishUser, setEnglishUser] = useState({});
  const { closeAll } = useContext(AuthContext);
  const { isNotLoading, isLoading } = useContext(ButtonLoadingContext);
  const signUp = async (email: string, password: string, onResetForm: () => void) => {
    isLoading();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      closeAll();
      onResetForm();
      sendVerificationEmail(email);
      isNotLoading();
    } catch (error: any) {
      onResetForm();

      if (error.code === 'auth/email-already-in-use') {
        createMessage({
          kind: 'error',
          title: 'Sign up failed',
          paragraph: "The email is already in use. You can login!",
        });
      } else {
        createMessage({
          kind: 'error',
          title: 'Sign up failed',
          paragraph: "We couldn't sign you up. Please check your credentials and try again.",
        });
      }
      isNotLoading();
    }
  };
  const login = async (email: string, password: string, onResetForm: () => void) => {
    isLoading();
    return await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        closeAll();
        if (user.emailVerified) {
          messageSuccessLogin();
        }
        else {
          sendVerificationEmail(user.email + "")
        }
        isNotLoading();
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
        isNotLoading();
      })
  }

  const loginWithGoogle = async () => {
    isLoading();
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle)
      .then(() => {
        closeAll();
        messageSuccessLogin();
        isNotLoading();
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Login Failed',
          paragraph: "We couldn't log you in. Please check your credentials and try again.",
          error: code
        });
        isNotLoading();
      });
  }
  const loginWithFacebook = async () => {
    isLoading();
    const responseFacebook = new FacebookAuthProvider();
    return await signInWithPopup(auth, responseFacebook)
      .then(() => {
        closeAll();
        messageSuccessLogin();
        isNotLoading();
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Login Failed',
          paragraph: "We couldn't log you in. Please check your credentials and try again.",
          error: code
        });
        isNotLoading();
      });
  }
  const resetPassword = async (email: string, onResetForm: () => void) => {
    isLoading();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        onResetForm();
        createMessage({
          kind: 'success',
          title: 'Password Reset Email Sent',
          paragraph: "We've successfully sent a password reset email to the provided email address. Please check your inbox for further instructions on how to reset your password. Thank you!",
        });
        isNotLoading();
      })
      .catch(({ code }) => {
        onResetForm();
        if (code == "auth/user-not-found") {
          createMessage({
            kind: 'error',
            title: 'Email Not Found',
            paragraph: "We couldn't find any account associated with the provided email address. Please make sure you have entered the correct email or consider creating a new account if you haven't already.",
          });
        }
        else {
          createMessage({
            kind: 'error',
            title: 'Password Reset Email Failed',
            paragraph: "We encountered an error while attempting to send the password reset email. Please try again later or contact our support team for assistance. Our team is here to help you regain access to your account as quickly as possible. We apologize for any inconvenience this may cause.",
            error: code
          });
        }
        isNotLoading();
      });
  }

  const minusCredits = (credits: number, lastCreditDate: string) => {
    if (lastCreditDate == "") {
      setEnglishUser({
        ...englishUser,
        credits
      })
    } else {
      setEnglishUser({
        ...englishUser,
        credits,
        lastCreditDate
      })
    }
  }
  const addCredits = async (newCredits: number, credits: number, idForm: string, newDate: string) => {
    if (credits == MAX_CREDIT) {
      return
    }
    credits = credits + newCredits
    if (credits > MAX_CREDIT) credits = MAX_CREDIT

    const usersRef = doc(db, "users", idForm);
    if (credits == MAX_CREDIT) {

      const lastCreditDate = new Date().toISOString();
      await updateDoc(usersRef, {
        ...englishUser,
        credits,
        lastCreditDate
      }).then(() => {
        setEnglishUser({
          ...englishUser,
          credits,
          lastCreditDate
        })
      })
        .catch(() => {
          unexpectedError();
        })
    }
    else {
      await updateDoc(usersRef, {
        ...englishUser,
        credits,
        lastCreditDate: newDate
      }).then(() => {
        setEnglishUser({
          ...englishUser,
          credits,
          lastCreditDate: newDate
        })
      })
        .catch(() => {
          unexpectedError();
        })
    }

  }
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        createMessage({
          kind: 'success',
          title: 'Logged Out Successfully',
          paragraph: 'You have been successfully logged out. Thank you for using our services!',
        });
        isNotLoading();
      })
      .catch(({ code }) => {
        createMessage({
          kind: 'error',
          title: 'Logout Failed',
          paragraph: 'Sorry, we encountered an error while trying to log you out. Please try again later.',
          error: code
        });
        isNotLoading();
      });
  };
  const changeProfilePhoto = async (url: string) => {
    setEnglishUser({
      ...englishUser,
      url
    });
  }
  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setEnglishUser({});
      } else {
        if (currentUser.emailVerified) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", currentUser.email));
          const querySnapshot = await getDocs(q);
          let infoUser = {
            country: "",
            englishLvl: "",
            fullName: "",
            interests: "",
            url: "",
            idForm: "",
            lastCreditDate: "",
            credits: 3,
            kind: "",
          }
          if (querySnapshot.empty) {
            try {
              await addDoc(collection(db, "users"), {
                country: "",
                email: currentUser.email,
                englishLvl: "",
                fullName: currentUser.displayName || "",
                interests: "",
                url: currentUser.photoURL || "",
                uid: currentUser.uid,
                creationDate: new Date().toISOString(),
                credits: 3,
                kind: "free",
                lastCreditDate: ""
              }).then((resp) => {
                infoUser.idForm = resp.id
              })
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
          querySnapshot.forEach((doc) => {
            infoUser = {
              country: doc.data().country,
              englishLvl: doc.data().englishLvl,
              fullName: doc.data().fullName,
              interests: doc.data().interests,
              url: doc.data().url,
              idForm: doc.id,
              lastCreditDate: doc.data().lastCreditDate,
              credits: doc.data().credits,
              kind: doc.data().kind
            }
          });

          setEnglishUser({
            ...englishUser,
            name: currentUser.displayName,
            email: currentUser.email,
            uid: currentUser.uid,
            url: infoUser.url != "" ? infoUser.url : currentUser.photoURL,
            country: infoUser.country,
            englishLvl: infoUser.englishLvl,
            fullName: infoUser.fullName,
            interests: infoUser.interests,
            idForm: infoUser.idForm,
            urlGoogle: currentUser.photoURL,
            lastCreditDate: infoUser.lastCreditDate,
            credits: infoUser.credits,
            kind: infoUser.kind
          });
        } else {
          try {
            await sendEmailVerification(currentUser);
            sendVerificationEmail(currentUser.email + "");
          } catch (error) {
          }

        }
      }
    })

    return () => suscribed()
  }, [])
  return (
    <UserContext.Provider value={{
      englishUser,
      minusCredits,
      changeProfilePhoto,
      signUp,
      login,
      loginWithGoogle,
      logOut,
      loginWithFacebook,
      resetPassword,
      addCredits
    }}>
      {children}
    </UserContext.Provider>
  );
};
