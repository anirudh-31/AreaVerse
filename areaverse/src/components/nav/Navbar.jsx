import React from 'react'
import './Navbar.css'
function Navbar() {
  function toggleHamburgerDisplay(){
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  }
  return (
    <React.Fragment>
        <nav>
            <div className="logo">
                AreaVerse
            </div>
            <ul className="nav-links" id="navLinks">
                <li><a href="#">Home</a></li>
                <li><a href="#">Explore</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Login | Signup</a></li>
            </ul>
            <div className="hamburger" id='hamburger' onClick={toggleHamburgerDisplay}>
              <div></div>
              <div></div>
              <div></div>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar