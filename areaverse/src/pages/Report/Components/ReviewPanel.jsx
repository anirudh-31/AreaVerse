import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReviewActionModal from './ReviewActionModal';
import ActionLoader from './ActionLoader';
import api from '../../../api/axios';

function ReviewPanel({id}) {
  const navigate                      = useNavigate();
  const [ modalState, setModalState ] = useState({ isOpen: false, mode: null });
  const [ isUpdating, setIsUpdating ] = useState({ action: null, updating: false});
  const handleOpenModal               = (mode) => setModalState({ isOpen: true, mode: mode });
  const handleCloseModal              = () => setModalState({ isOpen: false, mode: null });
  const config                        = {
    'reject'     : 'REJECTED',
    'requestInfo': 'MORE_INFO_NEEDED',
    'approve'    : 'APPROVED'
  }

  async function updatePost(action, actionText){
    setModalState({isOpen: false, mode: null})
    setIsUpdating({
      action,
      updating: true
    });
    try {
      const response = await api.patch(`/report/${id}/status`, {
        status  : config[action],
        feedback: actionText
      })
      setIsUpdating({
        action: null,
        updating: false
      })
    } catch (error){
      console.log(error)
    }
  }
  return (
    <React.Fragment>
        <ReviewActionModal modalState={modalState} onClose={handleCloseModal} onSubmit={updatePost}/>
        {
          isUpdating.updating &&
          <ActionLoader action={isUpdating.action} />
        }
        <div className="admin-review-actions">
            <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/review-reports')}>&larr; Back to list</button>
            <div className="admin-action-buttons">
                <button className="admin-btn admin-btn-info" onClick={() => handleOpenModal('requestInfo')}>Request Info</button>
                <button className="admin-btn admin-btn-reject" onClick={() => handleOpenModal('reject')}>Reject</button>
                <button className="admin-btn admin-btn-approve" onClick={() => updatePost('approve', 'Post was approved.')}>Approve</button>
            </div>
        </div>
        
    </React.Fragment>
  )
}

export default ReviewPanel