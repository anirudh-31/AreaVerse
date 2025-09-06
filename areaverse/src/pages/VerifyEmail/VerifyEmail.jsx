import React, { useRef, useState } from 'react'
import './VerifyEmail.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
function VerifyEmail() {
    const [searchParams]                = useSearchParams();
    const token                         = searchParams.get("token");
    const navigate                      = useNavigate();
    const [code, setCode]               = useState(['', '', '', '', '', '']);
    const [error, setErrorMessage]      = useState("");
    const [authError, setAuthError]     = useState("");
    const [authSuccess, setAuthSuccess] = useState("")
    const inputRefs                     = useRef([]);

    const handleChange = (e, index) => {
        setErrorMessage("");
        setAuthError("");
        const { value } = e.target;
        if (/[0-9]/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            // Move focus to the next input
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        setErrorMessage("");
        setAuthError("");
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setErrorMessage("");
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        const newCode = [...pasteData];
        setCode(newCode);
        if (newCode.length > 0) {
            inputRefs.current[newCode.length - 1].focus();
        }
    };

    const handleVerify = async () => {
        const fullCode = code.join('');
        setErrorMessage("");
        setAuthError("");
        if (fullCode.length === 6) {
            const payload = {
                token,
                "code": fullCode,
            }
            try{
                const response = await api.post("/auth/verify-email", payload);
                const statusMessage = response?.data?.message;
                console.log(statusMessage)
                console.log(response?.data)
                setAuthSuccess(statusMessage);

            }catch(err){
                setAuthError(err.response?.data?.message)
            }
        } else {
            setErrorMessage('Please enter the full 6-digit code.');
        }
    };
    function navigateToHomePage(){
        navigate("/")
    }
  return (
    <React.Fragment>
        <nav className="header">
            <div className="logo-group">
                <span className="logo-text" onClick={navigateToHomePage}>
                    AreaVerse
                </span>
            </div>
            <button id="show-auth-btn" className="auth-button" onClick={navigateToHomePage}>
                Home
            </button>
            
        </nav>
        <div className="verification-page">
            <div className="verification-container container">
                {
                    !authSuccess ? 
                    <>
                        <h2 className='verification-header'>Enter the 6-Digit Code</h2>
                            <p  className='verification-text'>A code has been sent to your email.</p>
                            <div className={`code-inputs ${error ? 'code-input-error' : ''} ${authError ? 'code-input-error' : ''}`} onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="code-input"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                    />
                                ))}
                            </div>
                            {
                                error &&
                                <span className='login-error'>{error}</span>
                            }
                            {
                                authError &&
                                <span className='login-error'>{authError}</span>
                            }
                            <button className="verify-button" onClick={handleVerify}>
                                Verify
                            </button>
                            <p className="resend-link">
                                Didn't receive the code? <a href="#">Resend</a>
                            </p>
                    </> :
                    <>
                        <span className='verification-success'>{authSuccess}.</span>
                    </>
                }
            </div>
        </div>
    </React.Fragment>
  )
}

export default VerifyEmail