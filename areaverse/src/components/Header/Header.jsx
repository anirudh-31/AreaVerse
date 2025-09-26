import React from 'react'
import './Header.css'
import ThemeToggler from '../ThemeToggler/ThemeToggler'
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
      
    
    function navigateToLoginPage() {
        navigate("/account")
    }
    function navigateToHomePage() {
        navigate("/")
    }
    return (
        <nav className="header">
            <div className="logo-group">
                <span className="logo-text" onClick={navigateToHomePage}>
                    AreaVerse
                </span>
                
            </div>
            <div className="header-options">
                <ThemeToggler />
                <button id="show-auth-btn" className="auth-button" onClick={navigateToLoginPage}>
                    Join Us
                </button>
            </div>
           
        </nav>
    )
}

export default Header