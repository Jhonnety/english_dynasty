import { Navigate, Route, Routes } from 'react-router-dom'
import { ProfilePage } from '../pages'

export const ProfileRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                {/* <Route path="subscription" element={<Subscription />} /> */}
                <Route path="/*" element={<Navigate to="/profile" />} />
            </Routes>
        </>
    )
}
