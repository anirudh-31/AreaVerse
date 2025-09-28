import { Server, User } from 'lucide-react'
import React from 'react'

function UpdateLoader() {
  return (
    <div className="action-loader-overlay loader-approve">
        <div className="loader-content">
            <div className="loader-path-container">
                <User className="loader-icon" />
                <svg className="loader-path-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 102 36">
                    <path d="M1 35C21.6667 21.6667 79 -16.5 101 1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <Server className="loader-icon" />
            </div>
            <p className="loader-text">Submitting Update...</p>
        </div>
    </div>
  )
}

export default UpdateLoader