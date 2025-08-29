import React from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
function Navbar() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch();

  function navigateToLoginPage(){
    window.location.href = "/account";
  }
  function navigateToHomePage(){
    window.location.href = "/";
  }
  function handleLogout(){
    dispatch(logoutUser())
  }
  
  return (
    <React.Fragment>
      <nav className="header">
        <div className="logo-group">
          <span className="logo-text" onClick={navigateToHomePage}>
            AreaVerse
          </span>
        </div>
        {
          user ?
          <button id="show-auth-btn" className="auth-button" onClick={handleLogout}>
            Log out
          </button> :
          <button id="show-auth-btn" className="auth-button" onClick={navigateToLoginPage}>
            Log in | Sign up
          </button>
        }
      </nav>
    </React.Fragment>
  )
}

export default Navbar;