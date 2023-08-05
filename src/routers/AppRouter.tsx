import { Routes, Route } from 'react-router-dom'
import { DynastyRoutes } from './DynastyRoutes'
import { TimeContext } from '../contexts';
import { useContext, useEffect } from 'react';

export const AppRouter = () => {


    const { resetTimer } = useContext(TimeContext);
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                resetTimer();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
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
