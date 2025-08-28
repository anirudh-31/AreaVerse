import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/auth/authSlice';

function Signup() {
    const dispatch         = useDispatch();
    const {loading, error} = useSelector((state) => {
        return state.auth
    });

    const [formData, setFormData] = useState({
        userName         : "",
        userEmail        : "",
        userPassword     : "",
        confirmedPassword: "",
        firstName        : "",
        lastName         : "",
        dateOfBirth      : "",
        city             : "",
        state            : "",
        area             : ""
    })

    const [viewPassword         , togglePasswordView         ] = useState(false);
    const [viewConfirmedPassword, toggleConfirmedPasswordView] = useState(false);
    const [signUpStep           , setSignUpStep              ] = useState(1);
    const [validationErrors     , setValidationErrors        ] = useState({
        userNameError     : "",
        passwordError     : "",
        passwordMatchError: "",
        emailError        : "",
        firstNameError    : "",

    })
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function toggleSignUpStep(evt, step){
        evt.preventDefault();
        if(step === 2){
            const emailError = document.getElementById('signup-email-error');
            const passwordError = document.getElementById('signup-password-error');
            const confirmPasswordError = document.getElementById('confirm-password-error');
            let isValid = true;
            if (!formData.userEmail || !isValidEmail(formData.userEmail)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!formData.userPassword) {
                passwordError.textContent = 'Password is required.';
                isValid = false;
            } else if (formData.userPassword.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                
                isValid = false;
            }

            if (formData.userPassword !== formData.confirmedPassword) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                isValid = false;
            }
            if(isValid){
                setSignUpStep(step)
            }
        }else{
            setSignUpStep(step)
        }
        
    }

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

    function handleUserSignup(event){
        event.preventDefault();
        dispatch(registerUser(
            {
                "username"  : formData.userName,
                "first_name": formData.firstName,
                "last_name" : formData.lastName,
                "profession": "",
                "password"  : formData.userPassword,
                "city"      : formData.city,
                "state"     : formData.state,
                "area"      : formData.area,
                "email"     : formData.userEmail
            }
        ));
        
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
            } else {
                passwordMismatchError.textContent = "";
            }
        }
       
    }, [formData.confirmedPassword, formData.userPassword]);


    return (
        <React.Fragment>
            <div className="auth-card">
                <div className="auth-form-content">
                    <form id="signup-form" class="form-content" >
                        {
                            signUpStep === 1 ? 
                                <div className="signup-step-section">
                                    <div className="input-group">
                                        <label for="user-name">User Name</label>
                                        <input type="text" id="user-name" placeholder="Enter your username" name='userName' onChange={handleSignUpData} value={formData.userName} />
                                        <span id="signup-username-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-email">Email Address</label>
                                        <input type="email" id="signup-email" placeholder="you@example.com" name='userEmail' onChange={handleSignUpData} value={formData.userEmail} />
                                        <span id="signup-email-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-password">Password</label>
                                        <input type={viewPassword ? "text" : "password"} id="signup-password" placeholder="Create a password" onChange={handleSignUpData} name='userPassword' value={formData.userPassword} />
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
                                        <span id="confirm-password-error" class="error-message"></span>
                                    </div>
                                    <button type="button" class="submit-btn" id="next-step-btn" onClick={(evt) => toggleSignUpStep(evt, 2)}>Next</button>
                                </div> :
                                <div className="signup-step-section">
                                    <div class="input-group">
                                        <label for="signup-firstname">First Name</label>
                                        <input type="text" id="signup-firstname" placeholder="Enter your first name" name="firstName" value={formData.firstName} onChange={handleSignUpData}/>
                                        <span id="signup-firstname-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-lastname">Last Name</label>
                                        <input type="text" id="signup-lastname" placeholder="Enter your last name" name="lastName" value={formData.lastName} onChange={handleSignUpData}/>
                                        <span id="signup-lastname-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-dob">Date of Birth</label>
                                        <input type="date" id="signup-dob" value={formData.dateOfBirth} name='dateOfBirth' onChange={handleSignUpData}/>
                                        <span id="signup-dob-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-city">City</label>
                                        <input type="text" id="signup-city" placeholder="e.g., Bengaluru" name="city" value={formData.city} onChange={handleSignUpData}/>
                                        <span id="signup-city-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-state">State</label>
                                        <input type="text" id="signup-state" placeholder="e.g., Karnataka" value={formData.state} name='state' onChange={handleSignUpData}/>
                                        <span id="signup-state-error" class="error-message"></span>
                                    </div>
                                    <div class="input-group">
                                        <label for="signup-areaname">Area Name</label>
                                        <input type="text" id="signup-areaname" placeholder="e.g., Koramangala" name='area' value={formData.area} onChange={handleSignUpData}/>
                                        <span id="signup-areaname-error" class="error-message"></span>
                                    </div>
                                    <div class="btn-group">
                                        <button type="button" class="submit-btn" id="back-step-btn" onClick={(evt) => toggleSignUpStep(evt, 1)} style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)" }} disabled={loading}>Back</button>
                                        <button type="submit" class="submit-btn" id="signup-submit-btn" onClick={handleUserSignup} disabled={loading}>
                                            {
                                                loading ?
                                                <><span class="spinner"></span> Loading...</>:
                                                <>
                                                Sign Up</>
                                            }
                                        </button>
                                    </div>
                                </div>
                        }
                        
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup