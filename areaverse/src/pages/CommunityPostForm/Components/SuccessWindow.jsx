import { FileText, Home, PlusCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessWindow({setStep, postId}) {
    const navigate = useNavigate()

    function navigateTo(path){
        navigate(path)
    }
    return (
        <div className="community-form-wizard">
            <div className="step-header" style={{ padding: '3rem 0', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem' }}>✅</div>
                <h2>Submission Successful!</h2>
                <p>Thank you for your report!. <br />Your report is now under review.</p>
            </div>
            <div className="action-buttons-panel">
                <button className="action-button" onClick={ () => navigateTo("/home")}>
                     <span className="circle"></span>
                    <Home />
                    <span className="action-text">
                        Home
                    </span>
                </button>
                <button className="action-button" onClick={() => navigateTo(`/report/${postId}`)}>
                    <span className="circle"></span>
                    <FileText />
                    <span className="action-text">
                        View Report
                    </span>
                </button>
                <button className="action-button" onClick={ () => setStep(1)}>
                    <span className="circle"></span>
                    <PlusCircle />
                    <span className="action-text">
                        New report
                    </span>
                </button>
            </div>
        </div>
    )
}

export default SuccessWindow