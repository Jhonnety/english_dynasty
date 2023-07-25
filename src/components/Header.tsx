import { useEffect, useState } from 'react'
import icon_englishdynasty from '../assets/icons/icon_englishdynasty.png'
import { Link, NavLink } from 'react-router-dom';
import { Profile } from '../profile/components/Profile';
import { MenuProfile, ProfileAdapted } from '../profile/components';

export const Header = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [screen, setScreen] = useState(true)
  const toggleNav = (responsiveNav: boolean = false) => {
    if (responsiveNav) setIsNavOpen(false);
    else setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 870) {
        setIsNavOpen(false);
        setScreen(true);
      }
      else {
        setScreen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
        <i className={`fa-solid navResponsiveButton ${isNavOpen ? ' fa-right-from-bracket' : 'fa-bars navbar-toggle-icon'}`}></i>
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
        <NavLink
          className={({ isActive }) => `${isActive ? 'active linkHeader' : 'linkHeader'}`}
          to="/games"
          onClick={() => toggleNav(true)}
        >
          <i className="fa-light fa-alien-8bit"></i> Games
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? 'active linkHeader' : 'linkHeader'}`}
          to="/resources"
          onClick={() => toggleNav(true)}
        >
          <i className="fa-solid fa-bullseye-arrow"></i> Resources
        </NavLink>
        {!screen && <><hr/><MenuProfile setIsSubMenuOpen={setIsNavOpen} /></>}
      </ul>
      <div className='searchContainer'>
        <input className='searchInput' placeholder='Search' />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {screen && <Profile />}
    </nav>

  )
}
