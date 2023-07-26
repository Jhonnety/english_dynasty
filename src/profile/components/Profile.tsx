import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { MenuProfile } from './MenuProfile';
import { AuthContext } from '../../contexts';

export const Profile = () => {
  const { englishUser } = useContext(UserContext);
  
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const { openLogin } = useContext(AuthContext);

  function getFirstName(fullName: string) {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    return capitalizedFirstName;
  }
  const subMenuOpen = () => {
    setIsSubMenuOpen(true);
  };

  const subMenuClose = () => {
    setIsSubMenuOpen(false);
  };

  const handleMenuProfile = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className='userProfile'>
      {englishUser.uid
        ?
        <>
          <div className='subMenuProfile' onMouseLeave={subMenuClose}
          >
            <h1>Hello, <button onMouseOver={subMenuOpen} onClick={handleMenuProfile}><b>{getFirstName(englishUser.name + "")} <i className="fa-solid fa-angle-down"></i></b></button></h1>
            <img src={englishUser.url} />
            {
              isSubMenuOpen && <MenuProfile setIsSubMenuOpen={setIsSubMenuOpen} />
            }
          </div>
        </>
        : <button onClick={openLogin} className='logInProfile'>Log in</button>
      }
    </div>
  )
}
