import { AlertTriangle, Check } from 'lucide-react';
import React from 'react'

function FollowNotification({ message, type, isVisible }) {
    if (!message) return null;

    return (
        <div className={`notification ${type} ${isVisible ? 'is-visible' : ''}`}>
            <div className="icon-wrapper">
                {type === 'success' ? <Check /> : <AlertTriangle />}
            </div>
            <span>{message}</span>
        </div>
    );
}

export default FollowNotification