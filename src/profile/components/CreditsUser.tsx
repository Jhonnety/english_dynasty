import { useEffect, useState } from "react";
import { pastDate } from "../../utils/creditsProb";

const timeCredit = 900; //15MIN
//data base
const calculateTimeDifferenceInSec = (pastDate: Date, presentDate: Date): number => {
  const differenceInMilliseconds = presentDate.getTime() - pastDate.getTime();
  const differenceInSeconds = differenceInMilliseconds / 1000;
  return differenceInSeconds;
}
const presentDate = new Date();
let differenceInSeconds = Math.round(calculateTimeDifferenceInSec(pastDate, presentDate));

//fin data base

//context credits
let credits = 1;

const addCredits = () => {
  while (differenceInSeconds >= timeCredit) {
    credits++;
    differenceInSeconds -= 900;
  }

}

export const CreditsUser = (/*differenceInSeconds*/) => {
  const [timeRemaining, setTimeRemaining] = useState(differenceInSeconds);

  const [isWhatCreditsOpen, setIsWhatCreditsOpen] = useState(false);

  addCredits();

  useEffect(() => {
    addCredits();



  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          console.log("Call to the fuction");
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="creditUserContainer">
      <h1 className="credits"><i className="fa-light fa-coin"></i> Credits: {credits}</h1>
      <h1 className="nextCredit">Next credit: {formatTime(timeRemaining)}</h1>
      <p className="newCredits">You will receive a credit recharge every 15 minutes, limited to a maximum of 3 recharges. Upgrade to premium to enjoy unlimited credits!.</p>

      <a className="whatCredits" onMouseLeave={() => setIsWhatCreditsOpen(false)} onMouseOver={() => setIsWhatCreditsOpen(true)} onClick={() => setIsWhatCreditsOpen(true)}>
        <i className=" fa-regular fa-circle-info"></i> What are the credits?
      </a>
      {isWhatCreditsOpen && <p className="whatCreditsDescription">The English Dynasty offers a wide range of games, tools, and resources that require credits. These credits are essential for unlocking and accessing various features and content within the platform.</p>}

    </div>
  )
}
