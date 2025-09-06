import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/auth/authSlice';
import LoginRedirectAnimation from '../../../components/LoginRedirectAnimation/LoginRedirectAnimation';
import { Check, Eye, EyeClosed, X } from 'lucide-react';

function Signup() {
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => {
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
        area             : "",
        gender           : ""
    })

    const [authError            , setAuthError               ] = useState('');
    const [viewPassword         , togglePasswordView         ] = useState(false);
    const [viewConfirmedPassword, toggleConfirmedPasswordView] = useState(false);
    const [rules                , setRules                   ] = useState({ length: false, upper: false, lower: false, number: false, special: false, });
    const [rulesVisible         , setRulesVisible            ] = useState(false);
    const [strength             , setStrength                ] = useState({ percent: 0, color: "red" });
    const [passwordMatch        , setPasswordMatch           ] = useState(false);
    const [fieldValidations     , setFieldValidations        ] = useState({});
    
    function validateForm() {
        const errors = {};
        
        if (!formData.firstName?.trim()) errors.firstName = "First name is required";
        if (!formData.userName?.trim()) errors.userName = "Username is required";
        
        if (!formData.userEmail?.trim()) {
            errors.userEmail = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
            errors.userEmail = "Invalid email format";
        }

        if (!formData.dateOfBirth?.trim()) errors.dateOfBirth = "Date of birth is required";

        if (!formData.city?.trim()) errors.city = "City is required";
        if (!formData.state?.trim()) errors.state = "State is required";
        if (!formData.area?.trim()) errors.area = "Locality is required";

        if (!formData.userPassword?.trim()) {
            errors.userPassword = "Password is required";
        } else {
            const { length, upper, lower, number, special } = {
                length: formData.userPassword.length >= 8,
                upper: /[A-Z]/.test(formData.userPassword),
                lower: /[a-z]/.test(formData.userPassword),
                number: /[0-9]/.test(formData.userPassword),
                special: /[^A-Za-z0-9]/.test(formData.userPassword),
            };

            if (!(length && upper && lower && number && special)) {
                errors.userPassword = "Password must contain uppercase, lowercase, number, special character and be at least 8 chars long";
            }
        }

        if (formData.userPassword !== formData.confirmedPassword) {
            errors.confirmedPassword = "Passwords do not match";
        }

        return errors;
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
        setFieldValidations({});
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        const length = formData.userPassword?.length >= 8;
        const upper = /[A-Z]/.test(formData.userPassword);
        const lower = /[a-z]/.test(formData.userPassword);
        const number = /[0-9]/.test(formData.userPassword);
        const special = /[^A-Za-z0-9]/.test(formData.userPassword);
        const score = [length, upper, lower, number, special].filter(Boolean).length;
        const percent = (score / 5) * 100;
        const color = score < 2 ? "red" : score < 4 ? "orange" : "green";
        setRules({ length, upper, lower, number, special });
        setStrength({ percent, color });
    }, [formData.userPassword]);

    useEffect(() => {
        setPasswordMatch(formData.userPassword === formData.confirmedPassword)
    }, [formData.confirmedPassword, formData.userPassword])

    function handleUserSignup(event) {
        event.preventDefault();
        const { userName, firstName, lastName, userPassword, city, state, area, userEmail, dateOfBirth } = formData;

        const formValidationErrors = validateForm(); 
        setFieldValidations({...formValidationErrors})
       if(Object.keys(formValidationErrors) == 0){
             dispatch(registerUser(
                                    {
                                        "username"   : userName.trim(),
                                        "first_name" : firstName.trim(),
                                        "last_name"  : lastName.trim(),
                                        "profession" : "",
                                        "password"   : userPassword.trim(),
                                        "city"       : city.trim(),
                                        "state"      : state.trim(),
                                        "area"       : area.trim(),
                                        "email"      : userEmail.trim(),
                                        "dateOfBirth": new Date(dateOfBirth).toISOString()
                                    }
                                    ));
       }else{
            return;
       }

    }

    useEffect(() => {
        if (error?.length > 0) {
            setAuthError(error)
        }
    }, [error])
    
    return (
        <React.Fragment>
            {
                user ?
                <LoginRedirectAnimation /> :
                    <div className="auth-form" >
                        <div className="form-grid">
                            <div className="input-group">
                                <input type="text" id="firstName" required placeholder=" " name='firstName' value={formData.firstName} onChange={handleSignUpData}/>
                                <label htmlFor="firstName">First Name</label>
                                {fieldValidations?.firstName?.length > 0 && <span className='field-validation-error'>{fieldValidations.firstName}</span>}
                            </div>
                            <div className="input-group">
                                <input type="text" id="lastName" required placeholder=" " name='lastName' value={formData.lastName} onChange={handleSignUpData}/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="input-group">
                                <input type="text" id="username" required placeholder=" " name='userName' value={formData.userName} onChange={handleSignUpData}/>
                                <label htmlFor="username">Username</label>
                                {fieldValidations?.userName?.length > 0 && <span className='field-validation-error'>{fieldValidations.userName}</span>}
                            </div>
                            <div className="input-group">
                                <input type="text" id="email" required placeholder=" " name='userEmail' value={formData.userEmail} onChange={handleSignUpData}/>
                                <label htmlFor="email">Email</label>
                                {fieldValidations?.userEmail?.length > 0 && <span className='field-validation-error'>{fieldValidations.userEmail}</span>}
                            </div>
                        </div>
                        <div className="form-grid">
                             <div className="input-group">
                                <input type="date" id="dob" required placeholder=" " value={formData.dateOfBirth} name='dateOfBirth' onChange={handleSignUpData}/>
                                <label htmlFor="dob">Date of Birth</label>
                                {fieldValidations?.dateOfBirth?.length > 0 && <span className='field-validation-error'>{fieldValidations.dateOfBirth}</span>}
                            </div>
                            <div className="input-group">
                                <input type="text" id="city" required placeholder=" " value={formData.city} onChange={handleSignUpData} name='city'/>
                                <label htmlFor="city">City</label>
                                {fieldValidations?.city?.length > 0 && <span className='field-validation-error'>{fieldValidations.city}</span>}
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <input type="text" id="state" required placeholder=" " value={formData.state} onChange={handleSignUpData} name='state'/>
                                <label htmlFor="state">State</label>
                                {fieldValidations?.state?.length > 0 && <span className='field-validation-error'>{fieldValidations.state}</span>}
                            </div>
                            <div className="input-group">
                                <input type="text" id="locality" required placeholder=" " value={formData.area} onChange={handleSignUpData} name='area'/>
                                <label htmlFor="locality">Locality</label>
                                {fieldValidations?.area?.length > 0 && <span className='field-validation-error'>{fieldValidations.area}</span>}
                            </div>
                        </div>
                        <div className="input-group password-wrapper">
                            <input type={viewPassword ? 'text' : "password"} id="signupPassword" required placeholder=" " name='userPassword' value={formData.userPassword} onChange={handleSignUpData} onFocus={() => setRulesVisible(true)} onBlur={() => setRulesVisible(false)}/>
                            <label htmlFor="signupPassword">Password</label>
                            <span className="toggle-password" data-target="signupPassword" onClick={handlePasswordView}>
                                {
                                    viewPassword ?
                                    <EyeClosed /> :
                                    <Eye />
                                }
                            </span>
                            
                        </div>
                        {fieldValidations?.userPassword?.length > 0 && <span className='field-validation-error'>{fieldValidations.userPassword}</span>}
                        {
                            formData.userPassword.length > 0 && (
                                <div className="strength-bar">
                                    <div className="strength-fill" id="strengthFill" style={{ width: strength.percent + "%", background: strength.color }}></div>
                                </div>
                            )
                        }
                        {
                            rulesVisible && (
                                <div className="rules" id="passwordRules" style={{ display: rulesVisible ? "flex" : "none" }}>
                                    <span id="ruleLength"  className={rules.length  ? "valid" : "invalid"}> {rules.length  ? <Check /> : <X />}At least 8 characters</span>
                                    <span id="ruleUpper"   className={rules.upper   ? "valid" : "invalid"}> {rules.upper   ? <Check /> : <X />}Contains uppercase</span>
                                    <span id="ruleLower"   className={rules.lower   ? "valid" : "invalid"}> {rules.lower   ? <Check /> : <X />}Contains lowercase</span>
                                    <span id="ruleNumber"  className={rules.number  ? "valid" : "invalid"}> {rules.number  ? <Check /> : <X />}Contains number</span>
                                    <span id="ruleSpecial" className={rules.special ? "valid" : "invalid"}> {rules.special ? <Check /> : <X />}Contains special character</span>
                                </div>
                            )
                        }
                        
                        <div className="input-group">
                            <input type={viewConfirmedPassword ? 'text' : "password"} id="confirmPassword" name='confirmedPassword' value={formData.confirmedPassword} onChange={handleSignUpData} required placeholder=" " />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <span className="toggle-password" data-target="signupPassword" onClick={handleConfirmedPasswordView}>
                                {
                                    viewConfirmedPassword ?
                                    <EyeClosed /> :
                                    <Eye />
                                }
                            </span>
                            
                        </div>
                        {
                            formData.userPassword && formData.confirmedPassword && !passwordMatch &&
                            <div className="rules">
                                <span id="ruleLength"  className={passwordMatch ? "valid" : "invalid"}>
                                    {
                                        passwordMatch ?
                                        "Passwords Match" :
                                        "Passwords do not match"
                                    }
                                </span>
                            </div>
                        }
                       {fieldValidations?.confirmedPassword?.length > 0 && <span className='field-validation-error'>{fieldValidations.confirmedPassword}</span>}
                        {
                            authError && <span className="login-error">{authError}</span>
                        }
                        <button type="submit" className="submit-btn" id="signup-submit-btn" onClick={handleUserSignup} disabled={loading}>
                            {
                                loading ?
                                    <><span className="spinner"></span> Loading...</> :
                                    <>
                                        Sign Up
                                    </>
                            }
                        </button>
                    </div>
            }
        </React.Fragment>
    )
}

export default Signup