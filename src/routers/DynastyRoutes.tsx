import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../components'
import { Games, Resources, Start } from '../pages'
import { ProfileRoutes } from '../profile/routes/ProfileRoutes'
import { AuthPage } from '../auth/pages/AuthPage'
import { useContext } from 'react';
import { UserContext } from '../contexts'

export const DynastyRoutes = () => {
    const { englishUser } = useContext(UserContext);
    return (
        <>
            <Header />
            <AuthPage />
            <Routes>
                <Route path="start" element={<Start />} />
                <Route path="games" element={<Games />} />
                <Route path="resources" element={<Resources />} />
                {englishUser.uid && <Route path="profile/*" element={<ProfileRoutes />} />}
                <Route path="/*" element={<Navigate to="/start" />} />
            </Routes>
            <Footer />
        </>
    )
}
