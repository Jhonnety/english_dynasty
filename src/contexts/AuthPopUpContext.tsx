import { createContext, useState, ReactNode } from 'react';

interface AuthData {
    login: boolean,
    signUp: boolean,
    forgotPassword: boolean
}
interface AuthContextData {
    isAuthOpen: AuthData;
    openLogin: () => void;
    openSignUp: () => void;
    openForgotPassword: () => void;
    closeAll: () => void;
}

export const AuthContext = createContext<AuthContextData>({
    isAuthOpen: {
        login: false,
        signUp: false,
        forgotPassword: false
    },
    openLogin: () => { },
    openSignUp: () => { },
    closeAll: () => { },
    openForgotPassword: () => { }
});


interface AuthPopUpContext {
    children: ReactNode
}

export const AuthPopUpContext = ({ children }: AuthPopUpContext) => {
    const [isAuthOpen, setIsAuthOpen] = useState({
        login: false,
        signUp: false,
        forgotPassword: false
    });

    const openLogin = () => {
        setIsAuthOpen({
            login: true,
            signUp: false,
            forgotPassword: false
        });
    };

    const openSignUp = () => {
        setIsAuthOpen({
            login: false,
            signUp: true,
            forgotPassword: false
        });
    };
    const openForgotPassword = () => {
        setIsAuthOpen({
            login: false,
            signUp: false,
            forgotPassword: true
        });
    }

    const closeAll = () => {
        setIsAuthOpen({
            login: false,
            signUp: false,
            forgotPassword: false
        });
    }
    return (
        <AuthContext.Provider value={{ isAuthOpen, openLogin, openSignUp, openForgotPassword, closeAll }}>
            {children}
        </AuthContext.Provider>
    );
};

