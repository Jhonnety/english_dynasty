import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Footer, Header } from '../../components'
import { AuthPage } from '../pages'
import { UserContext } from '../../contexts/UserProvider'
import { useContext, useEffect } from 'react'
import { Login } from '../components/Login'
import { SignUp } from '../components/SignUp'
import { FrameAuth } from '../components/FrameAuth'

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
            <AuthPage>
                <FrameAuth/>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </Routes>
            </AuthPage>
            <Footer />
        </>
    )
}
