import React, { useState, useEffect } from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom';
import { MessageCircleMore, Network, Users } from 'lucide-react';
import Footer from '../../components/Footer/Footer';
function Landing() {
  const [title, setTitle] = useState("AreaVerse - Home");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = title;
  }, [title])
  function navigateToLogin() {
    navigate("/account")
  }
  return (
    <React.Fragment>
      <main id="landing-page" className="main-content">
        <section className="container hero-section">
          <div className="hero-content hero-text-container">
            <h1 className="hero-title">
              {/* Shape Your Community, <span className="highlight">Share Your Voice</span>. Because every street has a story to tell. */}
              Every street has a story. <span className='highlight'>Lets write it together</span>
            </h1>
            <p className="hero-text">
              Share what you love and what needs improvement in your neighborhood. Connect with neighbors and work together to find solutions for local issues.
            </p>
            <button className="hero-cta" onClick={navigateToLogin}>
              Start sharing
            </button>
          </div>
          <div className="hero-image-container">
            <img className="hero-image" src="https://placehold.co/600x400/008080/FFFFFF?text=Logo+Or+AltImage" alt="" />
          </div>
        </section>

        <section className="container features-section">
          <div className="features-header">
            <h2 className="features-title">Why Use AreaVerse?</h2>
            <p className="features-subtitle">Discover the features that empower your community.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-container">
                <MessageCircleMore/>
              </div>
              <h3 className="feature-title">Share Feedback</h3>
              <p className="feature-description">
                Easily report the pros and cons of your neighborhood, from great parks to street repairs needed.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-container">
                <Network />
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
      </main>
    </React.Fragment>
  )
}

export default Landing