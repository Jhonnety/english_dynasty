import { Navigate, Route, Routes } from 'react-router-dom'
import { SwordMasterMenu, WordArrowMenu } from '../pages'

export const GamesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/swordmaster" element={<SwordMasterMenu />} />
         <Route path="/wordarrow" element={<WordArrowMenu />} /> 
        <Route path="/*" element={<Navigate to="/swordmaster" />} />
      </Routes>
    </>
  )
}
