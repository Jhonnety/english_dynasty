import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { Login, Register } from '../pages'
import { UserContext } from '../../contexts/UserProvider'
import { useContext, useEffect } from 'react'

export const AuthRoutes = () => {

    const { englishUser } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (englishUser.uid) {
            navigate('/start', { replace: true })
        }

    }, [englishUser])

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
