import React, { useEffect, useState } from 'react'
import './Auth.css'
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Header from '../../components/Header/Header';

function Auth() {
    const [title   , setTitle]    = useState("AreaVerse - Account");
    const [authMode, setAuthMode] = useState("login");

    function toggleAuthMode(mode) {
        setAuthMode(mode);
    }
    
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <React.Fragment>
           <Header />
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