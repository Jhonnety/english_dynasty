import { Navigate, Route, Routes } from 'react-router-dom'
import { GameCoverTemplate, WordArrowMenu } from '../pages'

export const GamesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/swordmaster" element={<GameCoverTemplate />} />
        <Route path="/wordarrow" element={<WordArrowMenu />} />
        <Route path="" element={<Navigate to="swordmaster" />} />
        <Route path="/*" element={<Navigate to="swordmaster" />} />
      </Routes>
    </>
  )
}
