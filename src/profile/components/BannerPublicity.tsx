import icon_rocket from '../../assets/icons/icon_rocket.png';

export const BannerPublicity = () => {
    /*   const [isAnimating, setIsAnimating] = useState(true);
  
      useEffect(() => {
          const animationInterval = setInterval(() => {
              setIsAnimating(!isAnimating);
          }, 5000);
  
          return () => {
              clearInterval(animationInterval);
          };
      }, [isAnimating]); 
      ${isAnimating ? 'flipInY' : ''}`}
      */

    return (
        <div className="bannerPublicityContainer">
            <h1 className="giftBox tada">🎁</h1>

            <div className="textGiftContainer">
                <h1 className="descountPorcent"  >Up to 90% off</h1>
                <img src={icon_rocket} className='rocketOffer' />
                <div className='offerContainer'>
                <h1 className='offerTitle movingText'>Be Premiun for just <b>1 dollar!</b></h1>
                </div>
            </div>
        </div>
    )
}
