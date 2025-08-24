import React, { useEffect, useState } from 'react'
import './Auth.css'
function Auth() {
    const [title, setTitle] = useState("AreaVerse - Account");
    const [authMode, setAuthMode] = useState("login");

    function toggleAuthMode(event) {
        setAuthMode(event.target.value);
    }
    useEffect(() => {
        document.title = title
    }, [title])
    return (
        <React.Fragment>
            <div className="container">
                <div className="left-panel">
                    <div className="building">🏢</div>
                    <h1>Find Your Next Space</h1>
                    <p>Join a community where real estate meets social networking.</p>
                </div>

                <div className="right-panel">
                    <input type="radio" name="formToggle" value="login"  id="login"  defaultChecked={authMode === "login"} />
                    <input type="radio" name="formToggle" value="signup" id="signup" defaultChecked={authMode === "signup"}/>

                    <div className="form-box">
                        <div className="toggle">
                            <label htmlFor="login"  onClick={toggleAuthMode}>Login</label>
                            <label htmlFor="signup" onClick={toggleAuthMode}>Sign Up</label>
                        </div>

                        <form className="login-form">
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Login</button>
                        </form>

                        <form className="signup-form">
                            <input type="text" placeholder="Full Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Auth