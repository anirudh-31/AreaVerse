import React, {useState}from 'react';
import './ThemeToggler.css';
import { useTheme } from '../../features/Context/ThemeContext';
function ThemeToggler() {
  const {theme, setTheme} = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div 
        className={`theme-toggler ${theme !== "light" ? 'active' : ''}`} 
        role='switch'
        aria-checked={theme}
        tabIndex={0}
        aria-label='Toggle dark mode'
        onClick={toggleTheme}
        onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleTheme();
        }}}
        >
        <div className="bg-layer">
            {/* Clouds for light mode */}
            <div className="cloud c1"></div>
            <div className="cloud c2"></div>
            <div className="cloud c3"></div>

            {/* Stars for dark mode */}
            <div className="bg-star s1"></div>
            <div className="bg-star s2"></div>
            <div className="bg-star s3"></div>
            <div className="bg-star s4"></div>
            <div className="bg-star s5"></div>
            <div className="bg-star s6"></div>
        </div>

        <div className={`knob ${theme === "dark" ? 'moon' : "sun"}`}>
            <span className="crater c1"></span>
            <span className="crater c2"></span>
            <span className="crater c3"></span>
            <span className="crater c4"></span>
            <span className="crater c5"></span>
        </div>
    </div>
  )
}

export default ThemeToggler