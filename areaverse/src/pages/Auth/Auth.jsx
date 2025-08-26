import React, { useEffect, useState } from 'react'
import './Auth.css'
import Login from './Login/Login';
import Signup from './Signup/Signup';

function Auth() {
    const [title   , setTitle   ] = useState("AreaVerse - Account");
    const [authMode, setAuthMode] = useState("login");
    
    function toggleAuthMode(mode) {
        setAuthMode(mode);
    }
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <React.Fragment>
            <div className="centered-container">
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