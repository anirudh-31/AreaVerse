import React, { useState, useRef } from 'react'

function CommentForm({ userInfo, writeNewComment }) {
    const [ comment     , setComment      ] = useState('');
    const [ isFocussed  , setIsFocussed   ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const textAreaRef                       = useRef(null);


    async function handleSubmit(){
        setIsSubmitting(true);
        const status = await writeNewComment(comment);
        if (status.status === 200){
            setComment('');
            setIsFocussed(false);
            setIsSubmitting(false);
            textAreaRef.current.blur();
        }
        
    }

  return (
    <div className="comment-card new-comment-card">
        <div className="comment-form">
            <span className="user-avatar">
                {userInfo?.username.charAt(0).toUpperCase()}
            </span>
            <div className="flex-1">
                <textarea 
                    ref={textAreaRef} 
                    id="comment-input" 
                    placeholder='Add a comment...' 
                    rows={isFocussed ? 3 : 1} 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onFocus={() => setIsFocussed(true)}/>
                {
                    isFocussed && (
                        <div id="comment-buttons">
                            <button className="btn btn-secondary">
                                Cancel
                            </button>
                            <button className={`btn btn-primary ${isSubmitting ? 'is-loading' : ''}`} disabled={!comment.trim() || isSubmitting} onClick={handleSubmit}>
                                Post
                            </button>
                        </div>
                    )
                }        
            </div>
        </div>
    </div>
  )
}

export default CommentForm