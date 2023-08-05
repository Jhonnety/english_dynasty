import { Routes, Route } from 'react-router-dom'
import { DynastyRoutes } from './DynastyRoutes'
import { TimeContext } from '../contexts';
import { useContext, useEffect } from 'react';

export const AppRouter = () => {


    const { resetTimer } = useContext(TimeContext);
    useEffect(() => {
        const handleFocus = () => {
            resetTimer();

        };
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };

    }, []);
    return (
        <>
            <Routes>
                <Route path="/*" element={<DynastyRoutes />}
                />
            </Routes>
        </>
    )
}
