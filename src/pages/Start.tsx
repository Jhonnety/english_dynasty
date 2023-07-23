import imagen_girl1 from '../assets/images/imagen_girl1.png';

export const Start = () => {
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
            <button className='premiumButton'>Premium <i className="fa-solid fa-angle-right"></i></button>
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
