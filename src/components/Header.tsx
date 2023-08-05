import { useContext, useEffect, useState } from 'react'
import icon_englishdynasty from '../assets/icons/icon_englishdynasty.png'
import { Link, NavLink } from 'react-router-dom';
import { Profile } from '../profile/components/Profile';
import { MenuProfile, ProfileAdapted } from '../profile/components';
import { AuthContext, UserContext } from '../contexts';
import { MenuGames } from '../games/components';

export const Header = () => {

  const { openLogin } = useContext(AuthContext);
  const { englishUser } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [screen, setScreen] = useState(true)


  const [isSubMenuGamesOpen, setIsSubMenuGamesOpen] = useState(false);

  const toggleNav = (responsiveNav: boolean = false) => {
    if (responsiveNav) setIsNavOpen(false);
    else setIsNavOpen(!isNavOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 870) {
      setIsNavOpen(false);
      setScreen(true);
    }
    else {
      setScreen(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLoginButton = () => {
    openLogin();
    toggleNav();
  }

  const subMenuGamesOpen = () => {
    setIsSubMenuGamesOpen(true);
  };

  const subMenuGamesClose = () => {
    setIsSubMenuGamesOpen(false);
  };

  const handleMenuGamesProfile = () => {
    setIsSubMenuGamesOpen(!isSubMenuGamesOpen);
  };

  const handleOnClickGames = (e: any) => {
    e.preventDefault();
    handleMenuGamesProfile();
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className='imgEnglish' src={icon_englishdynasty} alt='icon_englishdynasty' />
        <Link
          to="/"
        >
          English Dynasty
        </Link>
      </div>
      <button className="navbar-toggle" onClick={() => toggleNav()}>
        <i className={`navResponsiveButton ${isNavOpen ? 'fa-regular fa-xmark' : 'fa-solid fa-bars navbar-toggle-icon'}`}></i>
      </button>
      <ul className={`navbar-menu ${isNavOpen ? 'open' : ''} ${!screen ? 'fadeInDown' : ''}`}>
        {!screen && <ProfileAdapted />}
        <NavLink
          className={({ isActive }) => `${isActive ? 'active linkHeader' : 'linkHeader'}`}
          to="/start"
          onClick={() => toggleNav(true)}
        >
          <i className="fa-regular fa-house"></i> Start
        </NavLink>
        <div className='subMenuGamer' onMouseLeave={subMenuGamesClose}
        >
          <NavLink
            className={({ isActive }) => `${isActive ? 'active linkHeader' : 'linkHeader'}`}
            to=""
            onClick={handleOnClickGames}
            onMouseOver={subMenuGamesOpen}
          >
            <i className="fa-regular fa-dragon"></i> Games
          </NavLink>
          {
            isSubMenuGamesOpen && <MenuGames setIsSubMenuOpen={setIsNavOpen} />
          }
        </div>


        <NavLink
          className={({ isActive }) => `${isActive ? 'active linkHeader' : 'linkHeader'}`}
          to="/resources"
          onClick={() => toggleNav(true)}
        >
          <i className="fa-solid fa-bullseye-arrow"></i> Resources
        </NavLink>
        {!screen && !englishUser.uid && <button onClick={handleLoginButton} className='logInProfile'>Log in</button>}
        {!screen && <><hr /><MenuProfile setIsSubMenuOpen={setIsNavOpen} /></>}
      </ul>
      <div className='searchContainer'>
        <input className='searchInput' placeholder='Search' />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {screen && <Profile />}
    </nav>

  )
}
