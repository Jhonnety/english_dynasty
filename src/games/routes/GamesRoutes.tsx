import { Navigate, Route, Routes } from 'react-router-dom'
import { GameCoverTemplate, WordArrowMenu } from '../pages'
import { DescriptionGame } from '../components'

export const GamesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/swordmaster" element={<GameCoverTemplate />} />
        <Route path="swordmaster/:game" element={<DescriptionGame />} />
        <Route path="/wordarrow" element={<WordArrowMenu />} />
        <Route path="" element={<Navigate to="swordmaster" />} />
        <Route path="/*" element={<Navigate to="swordmaster" />} />
      </Routes>
    </>
  )
}
