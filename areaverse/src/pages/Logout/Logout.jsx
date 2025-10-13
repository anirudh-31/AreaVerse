import React, { useEffect, useState } from 'react'
import './Logout.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';
import { LogIn } from 'lucide-react';
function Logout() {
    const { user }              = useSelector(state => state.auth)
    const [ status, setStatus ] = useState("transitioning");
    const navigate              = useNavigate();
    const dispatch              = useDispatch();
    useEffect(() => {
        if(!user){
            navigate("/account")
        }
        const timer = setTimeout(() => {
            dispatch(logoutUser())
            setStatus('loggedOut');
        }, 3000); // Animation duration
        return () => clearTimeout(timer);
    }, []);
  return (
      <div className="logout-page">
          <div className={`logout-transition ${status}`}>
              <div className="stardust-container">
                  {Array.from({ length: 150 }).map((_, i) => (
                      <div className="stardust-particle" key={i} style={{ '--i': i }}></div>
                  ))}
              </div>
              <p className="logout-transition-text">Disconnecting from AreaVerse...</p>
          </div>
          <div className={`logout-content ${status === 'loggedOut' ? 'visible' : ''}`}>
              <h1>You're Logged Out</h1>
              <p>Thanks for your contributions. Come back soon!</p>
              <button className="login-btn flex-center" onClick={() => navigate("/account")}>
                <LogIn />
                <span>Log In</span>
              </button>
            </div>
      </div>
  )
}

export default Logout