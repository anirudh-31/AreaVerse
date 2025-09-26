import { ShieldBanIcon } from 'lucide-react'
import React from 'react'

function AccessDenied() {
    return (
        <div className="error-container">
            <ShieldBanIcon />
            <h2 className="error-title">Access Denied</h2>
            <p className="error-message">You do not have permission to view this page. This area is restricted to administrators only.</p>
        </div>
    )
}

export default AccessDenied