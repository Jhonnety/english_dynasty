import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { Login, Register } from '../pages'

export const AuthRoutes = () => {
    return (
        <>
            <Header />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </Routes>
            <Footer />
        </>
    )
}
