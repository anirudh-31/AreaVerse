import React, { useEffect, useState } from 'react';
import './Signup.css'
function Signup() {
    const [formData, setFormData] = useState({
        userName         : "",
        userEmail        : "",
        userPassword     : "",
        confirmedPassword: ""
    })

    const [viewPassword         , togglePasswordView         ] = useState(false);
    const [viewConfirmedPassword, toggleConfirmedPasswordView] = useState(false)

    function handlePasswordView(event) {
        event.preventDefault();
        togglePasswordView(!viewPassword)
    }

    function handleConfirmedPasswordView(event) {
        event.preventDefault();
        toggleConfirmedPasswordView(!viewConfirmedPassword)
    }

    function handleSignUpData(event) {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        const passwordStrengthBar  = document.getElementById('password-strength-bar');
        const passwordStrengthText = document.getElementById('password-strength-text');
        const password             = formData.userPassword;
        let strength               = 0;
        let text                   = '';
        if(password.length > 0){

            // Check for password length
            if (password.length >= 8) { strength++; }
            // Check for at least one uppercase letter
            if (password.match(/[A-Z]/)) { strength++; }
            // Check for at least one number
            if (password.match(/[0-9]/)) { strength++; }
            // Check for at least one special character
            if (password.match(/[^A-Za-z0-9]/)) { strength++; }

            // Determine the strength level and update the UI
            if (password.length > 0) {
                if (strength <= 1) {
                    text = 'Weak';
                    passwordStrengthBar.style.width = '25%';
                    passwordStrengthBar.className   = 'password-strength-bar weak';
                    passwordStrengthText.className  = 'password-strength-text text-weak';
                } else if (strength === 2) {
                    text = 'Medium';
                    passwordStrengthBar.style.width = '50%';
                    passwordStrengthBar.className   = 'password-strength-bar medium';
                    passwordStrengthText.className  = 'password-strength-text text-medium';
                } else if (strength > 2) {
                    text = 'Strong';
                    passwordStrengthBar.style.width = '100%';
                    passwordStrengthBar.className   = 'password-strength-bar strong';
                    passwordStrengthText.className  = 'password-strength-text text-strong';
                }
            } else {
                // Reset if the password field is empty
                text = '';
                passwordStrengthBar.style.width = '0';
                passwordStrengthBar.className   = 'password-strength-bar';
                passwordStrengthText.className  = 'password-strength-text';
            }

            passwordStrengthText.textContent = text;
        }
        
    }, [formData.userPassword])

    useEffect(() => {
        const {userPassword, confirmedPassword} = formData;
        const passwordMismatchError             = document.getElementById("confirm-password-error");

        if(userPassword.length > 0 && confirmedPassword.length > 0){
            if(userPassword !== confirmedPassword){
                passwordMismatchError.textContent = "Passwords do not match!!"
            }
        }
        else {
            passwordMismatchError.textContent = "";
        }
    }, [formData.confirmedPassword, formData.userPassword])
    return (
        <React.Fragment>
            <div className="auth-card">
                <div className="auth-form-content">
                    <form id="signup-form" class="form-content" >
                        <div class="input-group">
                            <label for="user-name">User Name</label>
                            <input type="text" id="user-name" placeholder="Enter your username" name='userName' onChange={handleSignUpData} value={formData.userName} />
                            <span id="signup-email-error" class="error-message"></span>
                        </div>
                        <div class="input-group">
                            <label for="signup-email">Email Address</label>
                            <input type="email" id="signup-email" placeholder="you@example.com" name='userEmail' onChange={handleSignUpData} value={formData.userEmail} />
                            <span id="signup-email-error" class="error-message"></span>
                        </div>
                        <div class="input-group">
                            <label for="signup-password">Password</label>
                            <input type={viewPassword ? "text" : "password"} id="signup-password" placeholder="Create a password" onChange={handleSignUpData} name='userPassword' value={formData.userPassword} />
                            {/* <button type="button" class="password-toggle" onClick={handlePasswordView}>
                        {
                            viewPassword ?
                                <EyeOff /> :
                                <Eye />

                        }
                    </button> */}
                            {
                                formData.userPassword.length > 0 ?
                                    <div class="password-strength-container">
                                        <div class="password-strength-meter">
                                            <div id="password-strength-bar" class="password-strength-bar"></div>
                                        </div>
                                        <div id="password-strength-text" class="password-strength-text"></div>
                                    </div> :
                                    <></>
                            }
                            <span id="signup-password-error" class="error-message"></span>
                        </div>
                        <div class="input-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input type={viewConfirmedPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm your password" onChange={handleSignUpData} name='confirmedPassword' value={formData.confirmedPassword} />
                            {/* <button type="button" class="password-toggle" onClick={handleConfirmedPasswordView}>
                        {
                            viewConfirmedPassword ?
                                <EyeOff /> :
                                <Eye />

                        }
                    </button> */}
                            <span id="confirm-password-error" class="error-message"></span>
                        </div>
                        <button type="submit" class="submit-btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup