import React, { useState } from 'react'
import './PasswordResetRequest.css';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

function PasswordResetRequest() {
  const [username    , setUsername    ] = useState("");
  const [userError   , setUsererror   ] = useState("");
  const [resetError  , setresetError  ] = useState("");
  const [loading     , setLoading     ] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();
  function handleUsername(event){
    event.preventDefault();
    setUsererror("");
    setUsername(event.target.value);
  }

  async function handlePasswordReset(){
    if(username.length == 0){
        setUsererror("Please enter your username");
        return;
    }
    try{
        setLoading(true);
        const response = await api.post("/auth/request-password-reset", { username });
        setLoading(false);
        setResetMessage(response.data?.message)
    } catch(err){
        setLoading(false);
        setresetError(err.response?.data?.message)
    }
  }
  return (
    <React.Fragment>
        <div className="password-reset-request-page">
            <div className="request-container container">
                {
                    resetMessage ?
                    <div className="reset-request-success">
                        <h2 className="reset-request-success-title">
                            {resetMessage}. 
                        </h2>
                        <span className="reset-request-success-message">
                            An email has been sent to your registered mail id with a link to reset the password.
                        </span>
                    </div>
                     :
                    <>
                        <h2>Forgot password</h2>
                        <p>Enter your username to receive a link to reset your password.</p>
                        <div className={`input-group ${userError.length > 0 ? 'username-input-error' : ''}`}>
                            <input type="text" id="username" name='username' required placeholder="" value={username} onChange={handleUsername}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        {
                            userError &&
                            <span className="login-error">
                                {userError}
                            </span>
                        }
                        {
                            resetError &&
                            <span className="login-error">
                                {resetError}
                            </span>
                        }
                        <button className='reset-btn' onClick={handlePasswordReset} disabled={loading}>
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
            <span className='back-link' onClick={() => navigate("/account")}>
                <MoveLeft />
                Back to login
            </span>
        </div>
    </React.Fragment>
  )
}

export default PasswordResetRequest