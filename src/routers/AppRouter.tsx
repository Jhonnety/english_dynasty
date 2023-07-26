import { Routes, Route } from 'react-router-dom'
import { DynastyRoutes } from './DynastyRoutes'

export const AppRouter = () => {
    return (
        <>
            <Routes>
{/*                 <Route path="/auth/*" element={<AuthRoutes />}
                /> */}
                <Route path="/*" element={<DynastyRoutes />}
                />
            </Routes>
        </>
    )
}
