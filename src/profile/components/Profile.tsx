import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
import { MenuProfile } from './MenuProfile';
import { useLocation } from 'react-router-dom';

export const Profile = () => {
  const { englishUser } = useContext(UserContext)
    ;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logIn = () => {
    navigate('/auth', { replace: true })
  };

  function getFirstName(fullName: string) {
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    return capitalizedFirstName;
  }

  const handleMenuProfile = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className='userProfile'>
      {englishUser.uid
        ?
        <>
          <h1>Hello, <button onClick={handleMenuProfile}><b>{getFirstName(englishUser.name + "")} <i className="fa-solid fa-angle-down"></i></b></button></h1>
          <img src={englishUser.url} />
          {
            isSubMenuOpen && <MenuProfile setIsSubMenuOpen={setIsSubMenuOpen}/>
          }
        </>
        : useLocation().pathname != '/auth/login' &&  <button onClick={logIn} className='logInProfile'>Log in</button>
      }
    </div>
  )
}
