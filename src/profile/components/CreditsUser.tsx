import { useContext, useState } from "react";
import { TimeContext, UserContext } from "../../contexts";

const MAX_CREDIT = parseInt(import.meta.env.VITE_MAX_CREDIT);

export const CreditsUser = () => {
  const { timeRemaining } = useContext(TimeContext);
  const { englishUser } = useContext(UserContext);
  const [isWhatCreditsOpen, setIsWhatCreditsOpen] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="creditUserContainer">
      <h1 className="credits"><i className="fa-light fa-coin"></i> Credits: {englishUser.credits}</h1>
      {englishUser.credits != MAX_CREDIT && <h1 className="nextCredit">Next credit: {formatTime(timeRemaining)}</h1>}
      <p className="newCredits">You will receive a credit recharge every 30 minutes, limited to a maximum of 3 recharges. Upgrade to premium to enjoy unlimited credits!.</p>

      <button className="whatCredits" onMouseLeave={() => setIsWhatCreditsOpen(false)} onMouseOver={() => setIsWhatCreditsOpen(true)} onClick={() => setIsWhatCreditsOpen(!isWhatCreditsOpen)}>
        <i className=" fa-regular fa-circle-info"></i> What are the credits?
      </button>
      {isWhatCreditsOpen && <p className="whatCreditsDescription">The English Dynasty offers a wide range of games, tools, and resources that require credits. These credits are essential for unlocking and accessing various features and content within the platform.</p>}

    </div>
  )
}
