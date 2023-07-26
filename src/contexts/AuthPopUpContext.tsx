import { createContext, useState, ReactNode } from 'react';

interface AuthData {
    login: boolean,
    singIn: boolean
}
interface AuthContextData {
    isAuthOpen: AuthData;
    openLogin: () => void;
    openSignIn: () => void;
    closeAll: () => void;
}

export const AuthContext = createContext<AuthContextData>({
    isAuthOpen: {
        login: false,
        singIn: false
    },
    openLogin: () => { },
    openSignIn: () => { },
    closeAll: () => { }
});


interface AuthPopUpContext {
    children: ReactNode
}

export const AuthPopUpContext = ({ children }: AuthPopUpContext) => {
    const [isAuthOpen, setIsAuthOpen] = useState({
        login: false,
        singIn: false
    });

    const openLogin = () => {
        setIsAuthOpen({
            login: true,
            singIn: false
        });
    };

    const openSignIn = () => {
        setIsAuthOpen({
            login: false,
            singIn: true
        });
    };

    const closeAll = () => {
        setIsAuthOpen({
            login: false,
            singIn: false
        });
    }
    return (
        <AuthContext.Provider value={{ isAuthOpen, openLogin, openSignIn, closeAll }}>
            {children}
        </AuthContext.Provider>
    );
};

