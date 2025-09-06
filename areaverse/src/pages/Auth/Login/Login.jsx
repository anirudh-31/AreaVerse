import { Eye, EyeClosed } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/auth/authSlice';
import LoginRedirectAnimation from '../../../components/LoginRedirectAnimation/LoginRedirectAnimation';
import Google from '../../../assets/google-icon.svg'
import Facebook  from '../../../assets/facebook-icon.svg'
import { useNavigate } from 'react-router-dom';
function Login() {

    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => {
        return state.auth
    });
    const [authError, setAuthError] = useState('');
    const [userError, setUserError] = useState("");
    const [formData, setFormData]   = useState({
        userEmail: "",
        userPassword: ""
    })

    const [viewPassword, toggleViewPassword] = useState(false);

    const dispatch = useDispatch();

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
        const {userEmail, userPassword} = formData;
        if(formData.userEmail && formData.userPassword){
            dispatch(loginUser({
                "userEmailOrUserName": userEmail,
                "password": userPassword
                }
            ));
        }else if(!userEmail && !userPassword){
            setUserError("Please enter your credentials.");
            return;
        }else if(!userEmail){
            setUserError("Please enter username or email.");
            return;
        }else{
            setUserError("Please enter your password.");
            return;
        }
    }
    useEffect(() => {
        if(userError?.length > 0){
            setTimeout(() => {
                setUserError("")
            }, 5000) 
        }
        if(authError?.length > 0){
            setTimeout(() => {
                setAuthError("")
            }, 5000) 
        }
    }, [userError, authError])

    useEffect(() => {
        if(error?.length > 0){
            setAuthError(error)
        }
    }, [error])
    return (
        <React.Fragment>
            {
                user ?
                <LoginRedirectAnimation />:
                <div className="auth-form">
                    <div className="input-group">
                        <input type="text" id="loginUsername" name='userEmail' value={formData.userEmail} required placeholder="" onChange={handleFormDataChange}/>
                        <label htmlFor="loginUsername">Username / Email</label>
                    </div>
                    <div className="input-group password-wrapper">
                        <input type={viewPassword ? 'text' : 'password'} name='userPassword' value={formData.userPassword} id="loginPassword" required placeholder=" " onChange={handleFormDataChange}/>
                        <label htmlFor="loginPassword">Password</label>
                        <span className="toggle-password" data-target="loginPassword" onClick={handlePasswordView}>
                            {
                                viewPassword ?
                                <EyeClosed /> :
                                <Eye />
                            }
                        </span>
                        
                    </div>
                    <span className='forgot-password' onClick={() => navigate("/request-passoword-reset")}>
                        Forgot Password?
                    </span>
                    {
                        authError?.length > 0 && <span className='login-error'>{authError}</span>
                    }
                    {
                        userError?.length > 0 && <span className='login-error'>{userError}</span>
                    }
                    <button  className="submit-btn" onClick={handleUserLogin} disabled={loading}>
                        {
                            loading ?
                                <><span className="spinner"></span> Loading...</> :
                                <>
                                    Login
                                </>
                        }
                    </button>
                    <div className="divider">
                        <span>Or Use</span>
                    </div>
                    <div className="social-buttons">
                        <button className="social-button">
                            <img src={Google} alt="Continue with google" />
                             Google
                        </button>
                        <button className="social-button">
                            <img src={Facebook} alt="Continue with facebook" />
                            Facebook
                        </button>
                    </div>
                </div>
                
            }
        </React.Fragment>
    )
}

export default Login