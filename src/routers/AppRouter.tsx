import { Routes, Route } from 'react-router-dom'
import { DynastyRoutes } from './DynastyRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/auth/*" element={<AuthRoutes/>}
                />
                <Route path="/*" element={<DynastyRoutes />}
                />
            </Routes>
        </>
    )
}
