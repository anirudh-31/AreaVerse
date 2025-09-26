import React, { useState } from 'react'

function ReviewActionModal({modalState, onClose, onSubmit}) {
    const [reason, setReason] = useState('');

    if (!modalState.isOpen) return null;

    const handleSubmit = (action) => {
        onSubmit(action, reason);
        setReason('');
    };

    const config = {
        reject: {
            title      : "Reason for Rejection",
            placeholder: "Please provide a reason for rejecting this post...",
            submitLabel: "Submit Rejection",
            action     : 'reject'
        },
        requestInfo: {
            title      : "Request More Information",
            placeholder: "What additional information do you need from the user?",
            submitLabel: "Send Request",
            action     : "requestInfo"
        }
    };
    
    const currentConfig = config[modalState.mode];
  return (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h3 className="modal-title">{currentConfig.title}</h3>
            </div>
            <div className="modal-body">
                <textarea 
                    className="modal-textarea"
                    placeholder={currentConfig.placeholder}
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                ></textarea>
            </div>
            <div className="modal-footer">
                <button className="btn admin-btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn admin-btn-info" onClick={() => handleSubmit(currentConfig.action)} disabled={reason.length < 1}>{currentConfig.submitLabel}</button>
            </div>
        </div>
    </div>
  )
}

export default ReviewActionModal