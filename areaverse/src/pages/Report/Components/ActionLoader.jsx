import { ShieldUserIcon, User,  } from 'lucide-react';
import React from 'react'

function ActionLoader({action}) {
    const config = {
        approve: { text: 'Approving Post...', className: 'loader-approve' },
        reject: { text: 'Rejecting Post...', className: 'loader-reject' },
        requestInfo: { text: 'Sending Request...', className: 'loader-requestInfo' }
    };
    const currentConfig = config[action] || { text: 'Processing...', className: '' };
    return (
        <div className={`action-loader-overlay ${currentConfig.className}`}>
            <div className="loader-content">
                <div className="loader-path-container">
                    <ShieldUserIcon className="loader-icon" />
                    <svg className="loader-path-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 102 36">
                        <path d="M1 25C21.6667 21.6667 79 -16.5 101 1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <User className="loader-icon" />
                </div>
                <p className="loader-text">{currentConfig.text}</p>
            </div>
        </div>
    )
}

export default ActionLoader