import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header } from '../components'
import { Games, Resources, Start } from '../pages'

export const DynastyRoutes = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path="start" element={<Start />} />
                    <Route path="games" element={<Games />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="/*" element={<Navigate to="/start" />} />
                </Routes> 
            </div>
            <Footer/>
        </>
    )
}
