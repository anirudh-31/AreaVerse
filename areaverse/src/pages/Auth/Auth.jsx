import React, { useEffect, useState } from 'react'
import './Auth.css'
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [title   , setTitle]    = useState("AreaVerse - Account");
    const [authMode, setAuthMode] = useState("login");
    const navigate = useNavigate()
    function toggleAuthMode(mode) {
        setAuthMode(mode);
    }
    function navigateToHomePage(){
        navigate("/")
    }
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <React.Fragment>
            <nav className="header">
                <div className="logo-group">
                    <span className="logo-text" onClick={navigateToHomePage}>
                        AreaVerse
                    </span>
                </div>
                <button id="show-auth-btn" className="auth-button" onClick={navigateToHomePage}>
                    Back
                </button>
                
            </nav>
            <div className="auth-page">
                <div className="auth-container">
                    <div className="form-toggle">
                        <button className={`toggle-btn ${authMode === "login" ? 'active' : ""}`} onClick={() => toggleAuthMode("login")}>
                            Login
                        </button>
                        <button className={`toggle-btn ${authMode === "signup" ? 'active' : ""}`} onClick={() => toggleAuthMode("signup")}>
                            Sign Up
                        </button>
                    </div>
                    {
                        authMode === "login" ?
                            <Login /> :
                            <Signup />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Auth