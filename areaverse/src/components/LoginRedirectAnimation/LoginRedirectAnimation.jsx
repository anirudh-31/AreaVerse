import React, { useEffect, useState } from 'react'
import './LoginRedirectAnimation.css';
import { useNavigate } from 'react-router-dom';

function LoginRedirectAnimation() {
    const [count, setCount] = useState(3);
    const navigate          = useNavigate()
    useEffect(() => {
        const countdownContainer = document.getElementById('countdown-container');
        const countdownNumber = document.getElementById('countdown-number');
        const countdownTagline = document.getElementById('countdown-tagline');
        const progressBar = document.getElementById('countdown-progress-bar');

        countdownContainer.style.display = 'flex';

        let count = 3;
        countdownNumber.textContent = count;

        // Animate the tagline, first number, and progress bar
        setTimeout(() => {
            countdownNumber.style.opacity = '1';
            countdownNumber.style.transform = 'translateY(0) scale(1)';
            countdownTagline.style.opacity = '1';
            countdownTagline.style.transform = 'translateY(0)';
            progressBar.style.transform = 'scaleX(1)';
        }, 10);

        const countdownInterval = setInterval(() => {
            count--;
            countdownNumber.textContent = count;

            if (count === 0) {
                clearInterval(countdownInterval);
                // Hide countdown and show home page
                setTimeout(() => {
                    countdownContainer.style.display = 'none';
                    navigate("/home")
                }, 500); // Small delay before transition
            }
        }, 1000);
    })
    return (
        <React.Fragment>
            <div id="countdown-container">
                <h1 id="countdown-number">3</h1>
                <p id="countdown-tagline">Bringing neighborhoods together.</p>
                <div id="countdown-progress-bar">
                    <div id="countdown-progress-bar-fill"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginRedirectAnimation