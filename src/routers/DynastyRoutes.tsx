import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../components'
import { Resources, Start } from '../pages'
import { ProfileRoutes } from '../profile/routes/ProfileRoutes'
import { AuthPage } from '../auth/pages/AuthPage'
import { GamesRoutes } from '../games/routes/GamesRoutes'

export const DynastyRoutes = () => {

    return (
        <>
            <Header />
            <AuthPage />
            <Routes>
                <Route path="/start" element={<Start />} />
                <Route path="/games/*" element={<GamesRoutes />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/profile/*" element={<ProfileRoutes />} />
                <Route path="/*" element={<Navigate to="/start" />} />
            </Routes>
            <Footer />
        </>
    )
}
