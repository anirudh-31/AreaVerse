import React, { useState, useEffect } from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom';
function Landing() {
  const [title, setTitle] = useState("AreaVerse - Home");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = title;
  }, [title])
  function navigateToLogin(){
    navigate("/account")
  }
  return (
    <React.Fragment>
      <section class="hero">
        <div class="hero-text">
          <h1>AreaVerse - Because every street has a story.</h1>
          <p>Join a community of homebuyers and locals sharing honest reviews about neighborhoods — so you always know what you're getting into.</p>
          <span class="cta" onClick={navigateToLogin}>Start Exploring</span>
        </div>
        <div class="hero-illustration">🏙️</div>
      </section>
    </React.Fragment>
  )
}

export default Landing