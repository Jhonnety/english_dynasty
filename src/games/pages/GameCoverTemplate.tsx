import { GameCover } from "../components/GameCover"

import livinRoom from '../../assets/games/sword_master/living_room/living_room_cover.png'

export const GameCoverTemplate = () => {
  return (
    <div className="gameMenuContainer">
      <div className="gamesContainer">

        <GameCover
          imgSrc={livinRoom}
          titleGame="Livin room"
          cost={1}
          mode="Object selection" />

        <GameCover
          imgSrc={livinRoom}
          titleGame="bathroom"
          cost={2}
          mode="Object selection" />
        <GameCover
          imgSrc={livinRoom}
          titleGame="Restroom"
          cost={3}
          mode="Object selection" />
        <GameCover
          imgSrc={livinRoom}
          titleGame="Kitchen"
          cost={4}
          mode="Object selection" />
        <GameCover
          imgSrc={livinRoom}
          titleGame="Basement"
          cost={5}
          mode="Object selection" />


      </div>
      <div className="topGamesContainer">

      </div>
    </div>
  )
}
