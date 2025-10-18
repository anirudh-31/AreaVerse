import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

function ReplyForm({ onSubmit, onCancel, replyingTo }) {
  const [ replyText   , setReplyText    ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const textAreaRef = useRef();

  const handleReply = async () => {
    setIsSubmitting(true);
    const response = await onSubmit(replyText);
    console.log(response);
    setIsSubmitting(false);
  }
  return (
    <div className="comment-form reply-input-enter reply-input-enter-active" style={{ marginTop: '1rem' }}>
        <span className="user-avatar">
            {
                user?.username.charAt(0).toUpperCase()
            }
        </span>
        <div className="flex-1">
          <textarea className='reply-textarea' name="reply-content" id="reply-content"ref={textAreaRef} rows={2} placeholder={`Replying to @${replyingTo}...`} onChange={ (e) => setReplyText(e.target.value)} value={replyText}/>
          <div className="reply-buttons">
            <button className="btn btn-secondary cancel-reply-btn" onClick={onCancel}>
              Cancel
            </button>
            <button className={`btn btn-primary post-reply-button ${isSubmitting ? 'is-loading' : ''}`} onClick={handleReply} disabled={!replyText.trim() || isSubmitting}>
              Reply
            </button>
          </div>
        </div>
    </div>
  )
}

export default ReplyForm