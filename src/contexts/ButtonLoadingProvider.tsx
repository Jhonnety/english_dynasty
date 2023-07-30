import { createContext, useState, ReactNode } from 'react';


interface LoadingData {
    loading: boolean;
    isLoading: () => void;
    isNotLoading: () => void;
}

export const ButtonLoadingContext = createContext<LoadingData>({
    loading: false,
    isLoading: () => { },
    isNotLoading: () => { },
});


interface ButtonLoadingProvider {
    children: ReactNode
}

export const ButtonLoadingProvider = ({ children }: ButtonLoadingProvider) => {
    const [loading, setLoading] = useState(false);

    const isLoading = () => {
        setLoading(true);
    };

    const isNotLoading = () => {
        setLoading(false);
    };

    return (
        <ButtonLoadingContext.Provider value={{ loading, isLoading, isNotLoading }}>
            {children}
        </ButtonLoadingContext.Provider>
    );
};

