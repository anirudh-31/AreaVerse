import React, { useState } from 'react'
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChartNoAxesCombined, FileWarning, HomeIcon, LogOut, MapPinned, Menu, UserRoundCog, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import SearchBar from '../SearchBar/SearchBar';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [displayMobileMenu, toggleMobileMenuDisplay] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleMobileMenuDisplay() {
    toggleMobileMenuDisplay(!displayMobileMenu)
  }
  function handleUserLogOut() {
    dispatch(logoutUser())
  }
  function navigateTo(link) {
    toggleMobileMenuDisplay(!displayMobileMenu);
    navigate(link);
  }
  return (
    <React.Fragment>
      <aside className="desktop-menu" id="desktop-menu">
        <div className="nav-options">
          <span className="desktop-menu-logo" onClick={() => navigate("/")}>
            AreaVerse
          </span>
          <ThemeToggler />
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
                <Bookmark />
                Saved Reports
              </span>
            </li>
            <li>
              <span className="nav-link"  onClick={() => navigate("/me")}>
                <UserRoundCog/>
                Profile
              </span>
            </li>
            {
              user.role === 'ADMIN' &&
              <li>
                <span className="nav-link"  onClick={() => navigate("/review-reports")}>
                  <FileWarning/>
                  Review reports
                </span>
              </li>
            }
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
            {user.username.charAt(0).toUpperCase()}
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
      </aside>
      <div className="mobile-nav-container">
        <div className="mobile-navbar">
          <div className={`mobile-menu-button ${displayMobileMenu ? 'open' : ''}`} onClick={handleMobileMenuDisplay}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-options">
            <ThemeToggler />
            <span className="mobile-menu-logo" onClick={() => navigate("/")}>
              AreaVerse
            </span>
            
          </div>
        </div>

        <div className={`mobile-dropdown ${displayMobileMenu ? 'show' : ''}`}>
          <ul>
            <li>
              <span className="mobile-nav-link" onClick={() => navigateTo("/home")}>
                <HomeIcon />
                Home
              </span>
            </li>
            <li>
              <span className="mobile-nav-link">
                <ChartNoAxesCombined />
                Dashboard
              </span>
            </li>
            <li>
              <span className="mobile-nav-link">
                <Bookmark />
                Saved Reports
              </span>
            </li>
            <li>
              <span className="mobile-nav-link" onClick={() => navigateTo("/me")}>
                <UserRoundCog />
                Profile
              </span>
            </li>
            {
              user.role === 'ADMIN' &&
               <li>
                <span className="mobile-nav-link" onClick={() => navigateTo("/review-reports")}>
                  <FileWarning />
                  Review reports
                </span>
              </li>
            }
            <li>
              <span className="mobile-nav-link" onClick={handleUserLogOut}>
                <LogOut />
                Log out
              </span>
            </li>
          </ul>
          <div className="mobile-nav-user-card">
            <div className="mobile-nav-user-info">
              <div className="mobile-nav-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="mobile-nav-user-details">
                <strong className="mobile-nav-user-name">
                  {user.username}
                </strong>
                <small className='mobile-nav-user-email'>
                  {user.email}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Navbar