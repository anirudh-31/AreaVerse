import React, { useState, useRef, useCallback, useEffect } from 'react'
import './ReportSubmissionAnimation.css';

let audioCtx;

function playTone(freq, duration, type = 'sine') {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode   = audioCtx.createGain();

  gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

// ✅ Success: quick ascending chime
function playSuccessSound() {
  playTone(600, 0.12, 'triangle');
  setTimeout(() => playTone(900, 0.18, 'triangle'), 120);
}

// ❌ Error: short descending buzz
function playErrorSound() {
  playTone(400, 0.2, 'sawtooth');
  setTimeout(() => playTone(200, 0.25, 'sawtooth'), 180);
}
function triggerHaptics(pattern) { if (navigator.vibrate) navigator.vibrate(pattern); }


function ReportSubmissionAnimation({ apiResult }) {
  const [animationState, setAnimationState] = useState('processing');
  const [message, setMessage] = useState('');
  const hasPlayedSound = useRef(false);

  useEffect(() => {
    // Initialize AudioContext on the first render (it's created in parent on submit)
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (apiResult && !hasPlayedSound.current) {
      if (apiResult.status === 'success') {
        setAnimationState('success');
        setMessage(apiResult.message);
        playSuccessSound();
        triggerHaptics([100, 50, 100]);
        hasPlayedSound.current = true;
      } else if (apiResult.status === 'error') {
        setAnimationState('error');
        setMessage(``);
        playErrorSound();
        triggerHaptics(400);
        hasPlayedSound.current = true;
      }
    }
  }, [apiResult]);

  // Construct the class name string based on the current state
  const illuminatorMap = {
    'Issue': 'Issue',
    'Query': 'Query',
    'Review': 'Review' // Map 'Review' from the form to 'info' for the CSS
  };
  const sortingType = apiResult ? illuminatorMap[apiResult.type] : '';

  const loaderClasses = `loader-overlay active ${animationState} ${animationState === 'success' ? `sorting-${sortingType}` : ''}`;
  return (
    <div className={loaderClasses}>
      <svg className="triage-engine-svg" viewBox="0 0 320 200">
        <path className="channel-path" d="M150 100 L 280 40"></path>
        <text className="channel-label" x="285" y="44">ISSUE</text>
        <path className="channel-path" d="M150 100 L 280 100"></path>
        <text className="channel-label" x="285" y="104">QUERY</text>
        <path className="channel-path" d="M150 100 L 280 160"></path>
        <text className="channel-label" x="285" y="164">INFO</text>

        <path className="path-illuminator illuminator-issue" stroke="var(--color-primary)" d="M150 100 L 280 40"></path>
        <path className="path-illuminator illuminator-query" stroke="var(--color-primary)" d="M150 100 L 280 100"></path>
        <path className="path-illuminator illuminator-info" stroke="var(--color-primary)" d="M150 100 L 280 160"></path>

        <circle className="nexus-point" cx="150" cy="100" r="8"></circle>
        <circle className="nexus-pulse" cx="150" cy="100" r="8"></circle>
        <rect className="data-packet" x="20" y="95" width="20" height="10" rx="2"></rect>
      </svg>
      {/* {
        apiResult?.status === 'success' ?
          <div className="step-header" style={{ padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>✅</div>
            <h2>Submission Successful!</h2>
            <p>Thank you for your report!. <br />Your report is now under review.</p>
          </div>
        : <></>
      } */}
    </div>
  );
};

export default ReportSubmissionAnimation