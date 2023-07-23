import { useEffect, useState } from 'react'
import icon_englishdynasty from '../assets/icons/icon_englishdynasty.png'
import { Profile } from './Profile';
import { Link, NavLink } from 'react-router-dom';

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
        <i className="fa-solid fa-bars navbar-toggle-icon"></i>
      </button>
      <ul className={`navbar-menu ${isNavOpen ? 'open' : ''}`}>
        {!screen && <Profile />}
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/start"
          onClick={() => toggleNav(true)}
        >
          Start
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/games"
          onClick={() => toggleNav(true)}
        >
          Games
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/resources"
          onClick={() => toggleNav(true)}
        >
          Resources
        </NavLink>
      </ul>
      <div className='searchContainer'>
        <input className='searchInput' placeholder='Search' />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {screen && <Profile />}
    </nav>

  )
}
