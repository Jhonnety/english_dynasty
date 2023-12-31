import { useNavigate } from "react-router-dom"

interface GameCoverProps {
    imgSrc: string,
    titleGame: string,
    cost: number,
    mode: string
}

export const GameCover: React.FC<GameCoverProps> = ({ imgSrc, titleGame, cost, mode }) => {

    const navigate = useNavigate()
    const handleClickGame = () => {
        const game = titleGame.replace(/\s/g, '');
        navigate(`${game.toLowerCase().trim()}`)
    }
    
    return (
        <div className="gameCoverContainer" onClick={handleClickGame}>
            <div className='starsContainer'>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
            <img className='coverImage' src={imgSrc} alt="livinRoom" />
            <h1 className='titleCover'>{titleGame}</h1>
            <p className='paragraphCover'>
                <b>Mode: </b>{mode} <i className="fa-solid fa-swords"></i>
            </p>
            <p className='paragraphCover'>
                <b>Cost: </b> {cost} credit <i className="fa-light fa-coin"></i>
            </p>
        </div>
    )
}
