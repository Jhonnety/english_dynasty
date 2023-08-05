import { Navigate, Route, Routes } from 'react-router-dom'
import { ProfilePage } from '../pages'

export const ProfileRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/info" element={<ProfilePage />} />
                {/* <Route path="subscription" element={<Subscription />} /> */}
                <Route path="" element={<Navigate to="info" />} />
                <Route path="/*" element={<Navigate to="info" />} />
            </Routes>
        </>
    )
}
