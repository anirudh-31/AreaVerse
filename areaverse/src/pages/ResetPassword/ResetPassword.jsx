import React, {useState, useEffect} from 'react'
import './ResetPassword.css'
import { Check, Eye, EyeClosed, MoveLeft, X } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
function ResetPassword() {
    const [searchParams]                    = useSearchParams();
    const token                             = searchParams.get("token");
    const navigate                          = useNavigate();
    const [ passwordData, setPasswordData ] = useState({
        password         : "",
        confirmedPassword: ""
    })
    const [viewPassword         , togglePasswordView         ] = useState(false);
    const [viewConfirmedPassword, toggleConfirmedPasswordView] = useState(false);
    const [rules                , setRules                   ] = useState({ length: false, upper: false, lower: false, number: false, special: false, });
    const [rulesVisible         , setRulesVisible            ] = useState(false);
    const [strength             , setStrength                ] = useState({ percent: 0, color: "red" });
    const [passwordMatch        , setPasswordMatch           ] = useState(false);
    const [fieldValidations     , setFieldValidations        ] = useState({});
    const [authError            , setAuthError               ] = useState("");
    const [authSuccess          , setAuthSuccess             ] = useState("");
    const [loading              , setLoading                 ] = useState(false)
    
    function handlePasswordData(event){
        event.preventDefault();
        setPasswordData({
            ...passwordData,
            [event.target.name] : event.target.value
        })
    }
    function handlePasswordView(event) {
        event.preventDefault();
        togglePasswordView(!viewPassword)
    }

    function handleConfirmedPasswordView(event) {
        event.preventDefault();
        toggleConfirmedPasswordView(!viewConfirmedPassword)
    }

    function validateForm() {
        const errors = {};
        
        if (!passwordData.password?.trim()) {
            errors.userPassword = "Password is required";
        } else {
            const { length, upper, lower, number, special } = {
                length: passwordData.password.length >= 8,
                upper: /[A-Z]/.test(passwordData.password),
                lower: /[a-z]/.test(passwordData.password),
                number: /[0-9]/.test(passwordData.password),
                special: /[^A-Za-z0-9]/.test(passwordData.password),
            };

            if (!(length && upper && lower && number && special)) {
                errors.password = "Password must contain uppercase, lowercase, number, special character and be at least 8 chars long";
            }
        }

        if (passwordData.password !== passwordData.confirmedPassword) {
            errors.confirmedPassword = "Passwords do not match";
        }
        
        return errors;
    }

    useEffect(() => {
        setPasswordMatch(passwordData.password === passwordData.confirmedPassword)
    }, [passwordData.confirmedPassword, passwordData.password])

    useEffect(() => {
        const length = passwordData.password?.length >= 8;
        const upper = /[A-Z]/.test(passwordData.password);
        const lower = /[a-z]/.test(passwordData.password);
        const number = /[0-9]/.test(passwordData.password);
        const special = /[^A-Za-z0-9]/.test(passwordData.password);
        const score = [length, upper, lower, number, special].filter(Boolean).length;
        const percent = (score / 5) * 100;
        const color = score < 2 ? "red" : score < 4 ? "orange" : "green";
        setRules({ length, upper, lower, number, special });
        setStrength({ percent, color });
    }, [passwordData.password]);

    async function handlePasswordReset(event){
        event.preventDefault();
        const formValidationErrors = validateForm();
        setFieldValidations({...formValidationErrors})

        if(Object.keys(formValidationErrors).length === 0){
            try{
                setLoading(true);
                const response = await api.post("/auth/reset-password", {
                    resetToken: token,
                    password  : passwordData.password
                })
                setLoading(false);
                setAuthSuccess(response?.data?.message);
            }catch (err){
                setLoading(false);
                setAuthError(err.response?.data?.message);
            }
        }else{
            return;
        }
    }
  return (
    <React.Fragment>
        <div className="reset-password-page">
            <div className="reset-password-container container">
            {
                authSuccess ?
                <div className="reset-request-success">
                    <h2 className="reset-request-success-title">
                        {authSuccess}. 
                    </h2>
                    <span className="reset-request-success-message">
                        Your password has been reset. Please log-in using your new password
                    </span>
                </div>:
                    <>
                    <h2>Forgot password</h2>
                    <p>Enter your new password below.</p>
                    <div className="input-group password-wrapper">
                        <input type={viewPassword ? 'text' : "password"} id="signupPassword" required placeholder=" " name='password' value={passwordData.password} onChange={handlePasswordData} onFocus={() => setRulesVisible(true)} onBlur={() => setRulesVisible(false)}/>
                        <label htmlFor="signupPassword">Password</label>
                        <span className="toggle-password" data-target="signupPassword" onClick={handlePasswordView}>
                            {
                                viewPassword ?
                                <EyeClosed /> :
                                <Eye />
                            }
                        </span>
                        
                    </div>
                    {fieldValidations?.password?.length > 0 && <span className='field-validation-error'>{fieldValidations.password}</span>}
                    {
                        passwordData.password.length > 0 && (
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
                        <input type={viewConfirmedPassword ? 'text' : "password"} id="confirmPassword" name='confirmedPassword' value={passwordData.confirmedPassword} onChange={handlePasswordData} required placeholder=" " />
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
                        passwordData.password && passwordData.confirmedPassword && !passwordMatch &&
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
                    {
                        authError && <span className="login-error">{authError}</span>
                    }
                    <button className="reset-password-button" onClick={handlePasswordReset} disabled={loading}>
                        {
                            loading ?
                                <><span className="spinner"></span> Loading...</> :
                                <>
                                    Reset Password
                                </>
                        }
                    </button>
                </>
            }
            </div>
            <span className='back-link' onClick={() => navigate("/account")} >
                <MoveLeft />
                Back to login
            </span>
        </div>
    </React.Fragment>
  )
}

export default ResetPassword