import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../components'
import { Games, Resources, Start } from '../pages'
import { ProfileRoutes } from '../profile/routes/ProfileRoutes'

export const DynastyRoutes = () => {
    return (
        <>
            <Header />
                <Routes>
                    <Route path="start" element={<Start />} />
                    <Route path="games" element={<Games />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="profile/*" element={<ProfileRoutes />} />
                    <Route path="/*" element={<Navigate to="/start" />} />
                </Routes> 
            <Footer/>
        </>
    )
}
