import React, { useState } from 'react'
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { ChartNoAxesCombined, HomeIcon, LogOut, MapPinned, Menu, UserRoundCog, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [displayMobileMenu, toggleMobileMenuDisplay] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleMobileMenuDisplay(){
    toggleMobileMenuDisplay(!displayMobileMenu)
  }
  function handleUserLogOut() {
    dispatch(logoutUser())
  }
  function navigateTo(link){
    toggleMobileMenuDisplay(!displayMobileMenu);
    navigate(link);
  }
  return (
    <React.Fragment>
      <aside className="desktop-menu" id="desktop-menu">
        <span className="desktop-menu-logo" onClick={() => navigate("/")}>
          AreaVerse
        </span>
        <div className="user-details">
          <div className="avatar">
            {user.username.charAt(0)}
          </div>
          <div className="details">
            <p className="name">
              {user.username}
            </p>
            <p className='email'>
              {user.email}
            </p>
          </div>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <span className="nav-link" onClick={() => navigate("/home")}>
                <HomeIcon />
                Home
              </span>
            </li>
            <li>
              <span className="nav-link">
                <ChartNoAxesCombined />
                Dashboard
              </span>
            </li>
            <li>
              <span className="nav-link">
                <MapPinned />
                Neighborhoods
              </span>
            </li>
            <li>
              <span className="nav-link">
                <UserRoundCog />
                Profile
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={handleUserLogOut}>
                <LogOut />
                Log out
              </span>
            </li>
          </ul>
        </nav>
      </aside>
      <div id="mobile-nav" className={`mobile-nav ${displayMobileMenu ? 'active' : ''}`}>
        <div className='mobile-nav-header'>
          {/* <span className="mobile-menu-logo" onClick={() => navigate("/")}>
            AreaVerse
          </span> */}
          <button id="mobile-menu-close" className='mobile-menu-close' onClick={handleMobileMenuDisplay}>
            <X />
          </button>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <span className="nav-link" onClick={() => navigateTo("/home")}>
                <HomeIcon />
                Home
              </span>
            </li>
            <li>
              <span className="nav-link">
                <ChartNoAxesCombined />
                Dashboard
              </span>
            </li>
            <li>
              <span className="nav-link">
                <MapPinned />
                Neighborhoods
              </span>
            </li>
            <li>
              <span className="nav-link">
                <UserRoundCog />
                Profile
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={handleUserLogOut}>
                <LogOut />
                Log out
              </span>
            </li>
          </ul>
        </nav>
        <div className="user-details">
          <div className="avatar">
            {user.username.charAt(0)}
          </div>
          <div className="details">
            <p className="name">
              {user.username}
            </p>
            <p className='email'>
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="mobile-menu">
        <button id="menu-toggle" className="menu-toggle-btn" onClick={handleMobileMenuDisplay}>
          <Menu />
        </button>
        <span className="mobile-menu-logo" onClick={() => navigate("/")}>
          AreaVerse
        </span>
      </div>
      
    </React.Fragment>
  )
}

export default Navbar