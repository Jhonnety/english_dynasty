import { useContext } from 'react';
import imagen_girl1 from '../assets/images/imagen_girl1.png';
import { UserContext } from '../contexts';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/Initialization';
import { useMessage } from '../hooks/useMessage';

const MAX_CREDIT = parseInt(import.meta.env.VITE_MAX_CREDIT)

export const Start = () => {
  const { englishUser, minusCredits } = useContext(UserContext);
  const { createMessage } = useMessage()
  const handleMinusOneCredit = async (credits: number) => {
    const idForm = englishUser.idForm + "";
    const usersRef = doc(db, "users", idForm);
    const lastCreditDate = new Date().toISOString()
    if (englishUser.credits != undefined) {
      const newCredits = englishUser.credits - credits;
      if (englishUser.credits == MAX_CREDIT) {
        await updateDoc(usersRef, {
          ...englishUser,
          credits: newCredits,
          lastCreditDate
        }).then(() => {
          if (englishUser.credits != undefined) {
            minusCredits(newCredits, lastCreditDate);
            createMessage({
              kind: 'success',
              title: 'Minus one credit',
              paragraph: 'You wasted 1 credit',
            });
          }
        })
          .catch((e) => { console.log(e) })
      } else if (englishUser.credits <= 0) {
        console.log("No credits")
      }
      else {
        await updateDoc(usersRef, {
          ...englishUser,
          credits: newCredits,
        }).then(() => {
          if (englishUser.credits != undefined) {
            minusCredits(newCredits, "");
            createMessage({
              kind: 'success',
              title: 'Minus one credit',
              paragraph: 'You wasted 1 credit',
            });
          }
        })
          .catch((e) => { console.log(e) })
      }



    }
  }

  return (
    <>
      <div className='containerGirl1'>
        <div className='containerStart'>
          <div className='startText fadeUpAnimation'>
            <h1>Discover a world of words and unleash the potential of your vocabulary with us.</h1>
            <h2>English Dynasty</h2>
            <p>Welcome to your all-in-one English learning hub: Explore tools, games, resources, strategies, audios, phrases, words, videos, and engaging classes for easy language mastery</p>
          </div>
          <div className='startButton'>
            <button className='randomGameButton'><i className="fa-solid fa-angle-left"></i> Random game</button>
            <button onClick={() => handleMinusOneCredit(1)} className='premiumButton'>Premium <i className="fa-solid fa-angle-right"></i></button>
          </div>
        </div>
        <img
          src={imagen_girl1}
          alt="imagen_girl1"
          className='imgGirl1 fadeUpAnimation'
        />
      </div>
      <div className='containerAllResources'>
        <div className='containerAll'>

        </div>
        <div className='containerNews'>

        </div>
      </div>


    </>
  )
}
