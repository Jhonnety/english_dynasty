import { Routes, Route } from 'react-router-dom'
import { DynastyRoutes } from './DynastyRoutes'
import { Auth } from '../components'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<Auth/>}
                />
                <Route path="/*" element={<DynastyRoutes />}
                />
            </Routes>
        </>
    )
}
