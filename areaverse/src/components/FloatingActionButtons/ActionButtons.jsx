import React, { useState } from 'react'
import './ActionButtons.css'
import { triggerHaptic } from '../../utils/CommonFunctions';
import { Calendar, FunnelPlus, Plus, Siren, SquarePen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function ActionButtons() {
    const [isDialOpen, setIsDialOpen] = useState(false);
    const navigate                    = useNavigate();
    function toggleDial(){
        triggerHaptic('light');
        setIsDialOpen(!isDialOpen)
    }

    function handleCreateClick(){
        navigate("/create-report")
    }
    return (
        <div className='action-buttons'>
            <div className={`filter-container ${isDialOpen ? 'active' : ''}`}>
                <div className="arc-menu">
                    <div className="arc-item" title="Issues"><Siren /></div>
                    <div className="arc-item" title="Good Things"><Users /></div>
                    <div className="arc-item" title="Events"><Calendar /></div>
                </div>
                <button className="fab" id="fab" onClick={toggleDial}>
                    <FunnelPlus />
                </button>
            </div>

            <button
                className="create-fab"
                id="createPostBtn"
                title="Create Post"
                onClick={handleCreateClick}
            >
                {/* <SquarePen /> */}
                <Plus />
            </button>
        </div>
    )
}

export default ActionButtons