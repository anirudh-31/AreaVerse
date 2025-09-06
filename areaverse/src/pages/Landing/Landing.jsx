import React, { useState, useEffect } from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom';
import { Handshake, MessageCircleMore, Network, Users } from 'lucide-react';

function Landing() {
  const [title, setTitle] = useState("AreaVerse - Home");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title])


  function navigateToLoginPage() {
    navigate("/account")
  }
  function navigateToHomePage() {
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

        <button id="show-auth-btn" className="auth-button" onClick={navigateToLoginPage}>
          Join Us
        </button>

      </nav>
      <main id="landing-page" className="main-content">
        <section className="container hero-section">
          <div className="hero-content hero-text-container">
            <h1 className="hero-title">
              {/* Shape Your Community, <span className="highlight">Share Your Voice</span>. Because every street has a story to tell. */}
              Every street has a story. <span className='highlight'>Let's write it together.</span>
            </h1>
            <p className="hero-text">
              Share what you love and what needs improvement in your neighborhood. Connect with neighbors and work together to find solutions for local issues.
            </p>
            <button className="hero-cta" onClick={navigateToLoginPage}>
              Start sharing
            </button>
          </div>
          <div className="hero-image-container">
            <img className="hero-image" src="https://placehold.co/600x400/070707/FFFFFF?text=Logo+Or+AltImage" alt="" />
          </div>
        </section>

        <section className="container features-section">
          <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon-container">
                  <MessageCircleMore />
                </div>
                <h3 className="feature-title">Share Feedback</h3>
                <p className="feature-description">
                  Easily report the pros and cons of your neighborhood, from great parks to street repairs needed.
                </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-container">
                <Handshake />
              </div>
              <h3 className="feature-title">Collaborate on Solutions</h3>
              <p className="feature-description">
                Connect with neighbors to discuss issues, propose solutions, and work together for positive change.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-container">
                <Users />
              </div>
              <h3 className="feature-title">Build a Better Community</h3>
              <p className="feature-description">
                Contribute to a public record of community well-being that benefits everyone living in the area.
              </p>
            </div>
          </div>
        </section>
        <footer className="footer">
          &copy; 2025 AreaVerse. Built for communities.
        </footer>
      </main>
    </React.Fragment>
  )
}

export default Landing