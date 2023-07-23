import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { Login, Register } from '../pages'

export const AuthRoutes = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}
