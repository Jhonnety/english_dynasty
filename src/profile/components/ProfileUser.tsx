import { useState } from 'react';
import imageProfile from '../../assets/animals/animal_bear.png';

export const ProfileUser = () => {
  const [isOpenProfiles, setIsOpenProfiles] = useState(false)
  return (
    <>
      <div className="profileImageContainer">
        <div className="backgroundContainer"><div></div></div>
        <div className="imageProfile">
          <img src={imageProfile} />
          <button className='changeProfileButton'
            onClick={() => setIsOpenProfiles(!isOpenProfiles)}>
            <i className="fa-solid fa-clothes-hanger"></i>
          </button>
        </div>
        {isOpenProfiles &&
          <div className='changeProfileImageContainer'>

          </div>
        }
        <h1 className="nameProfile">Jhon</h1>
        <h1 className="subcriptionProfile">Free account</h1>
      </div>
    </>
  )
}
