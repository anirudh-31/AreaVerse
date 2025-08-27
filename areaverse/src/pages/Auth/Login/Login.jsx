import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import './Login.css';
function Login() {
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    })
    const [viewPassword, toggleViewPassword] = useState(false)

    function handleFormDataChange(event) {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handlePasswordView(event) {
        event.preventDefault();
        toggleViewPassword(!viewPassword)
    }

    function handleUserLogin(event) {
        event.preventDefault();
        console.log(formData)
    }
    
    return (
        <React.Fragment>
            <div className="auth-card">
                <div className="auth-form-content">
                    <div className="social-buttons">
                        <button className="social-button">
                            <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                            Continue with Google
                        </button>
                        <button className="social-button">
                            <svg fill="#1877f2" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1168.737 487.897c44.672-41.401 113.824-36.889 118.9-36.663l289.354-.113 6.317-417.504L1539.65 22.9C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l62.045-451.233H1126.66v-69.152c0-54.937 14.214-96.112 42.078-122.058" fill-rule="evenodd"></path> </g></svg>
                            Continue with Facebook
                        </button>
                    </div>
                    <div className="divider">
                        <span>Or</span>
                    </div>
                    <form id="login-form" className="form-content">
                        <div className="input-group">
                            <label htmlFor="email">Email Address </label>
                            <input type="email" name="userEmail" value={formData.userEmail} id="email" placeholder='you@example.com' onChange={handleFormDataChange} />
                            <span id="login-email-error" className="error-message"></span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="login-password">Password</label>
                            <input type={viewPassword ? "text" : "password"} id="login-password" placeholder="Enter your password" />
                            <button type="button" className="password-toggle" onClick={handlePasswordView}>
                                {
                                    viewPassword ?
                                        <EyeOff /> :
                                        <Eye />

                                }
                            </button>
                            <span id="login-password-error" class="error-message"></span>
                        </div>
                        <button type="submit" className="submit-btn" onClick={handleUserLogin}>Login</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login