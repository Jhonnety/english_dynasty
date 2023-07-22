import { useEffect, useState } from 'react'
import icon_englishdynasty from '../assets/icons/icon_englishdynasty.png'
import { Profile } from './Profile';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [screen, setScreen] = useState(true)
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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


  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos === 0;

    setIsNavVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`navbar  ${isNavVisible ? 'visible' : 'hidden'} ${prevScrollPos > 50 ? 'window' : ''}`}>
      <div className="navbar-brand">
        <img className='imgEnglish' src={icon_englishdynasty} />
        <Link
          to="/"
        >
          English Dynasty
        </Link>
      </div>
      <button className="navbar-toggle" onClick={toggleNav}>
        <i className="fa-solid fa-bars navbar-toggle-icon"></i>
      </button>
      <ul className={`navbar-menu ${isNavOpen ? 'open' : ''}`}>
        {!screen && <Profile />}
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/start"
        >
          Start
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/games"
        >
          Games
        </NavLink>
        <NavLink
          className={({ isActive }) => `${isActive ? 'active' : ''}`}
          to="/resources"
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
