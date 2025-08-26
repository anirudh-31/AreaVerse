import React from 'react'
import './Navbar.css'
function Navbar() {
  
  function navigateToLoginPage(){
    window.location.href = "/account";
  }
  function navigateToHomePage(){
    window.location.href = "/";
  }
  return (
    <React.Fragment>
      <nav className="header">
        <div className="logo-group">
          <span className="logo-text" onClick={navigateToHomePage}>
            AreaVerse
          </span>
        </div>
        <button id="show-auth-btn" className="auth-button" onClick={navigateToLoginPage}>
          Log in | Sign up
        </button>
      </nav>
    </React.Fragment>
  )
}

export default Navbar