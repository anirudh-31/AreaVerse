import React, { useState } from 'react'
import { timeAgo } from '../../../../utils/CommonFunctions';
import { Heart } from 'lucide-react';

function Comment({ comment }) {
  const [ isLiked    , setIsLiked    ] = useState(false);
  const [ likeCount  , setLikeCount  ] = useState(comment.likes);
  const [ isPopping  , setIsPopping  ] = useState(false);
  const [ showReplies, setShowReplies] = useState(false);
  const [ isReplying , setIsReplying ] = useState(false);
  const [ replies    , setReplies    ] = useState(comment.replies || []);
  const [ newReplyId , setNewReplyId ] = useState(null);

  
  return (
    <div className={`comment ${comment?.isReply ? 'is-reply' : ''} ${isReplying ? 'is-replying-to' : ''}`}>
      <span className="user-avatar">
        {comment?.user?.username.charAt(0).toUpperCase()}
      </span>
      <div className="comment-content">
        <div className="comment-bubble">
          <div className="comment-header">
            <span className="comment-author">
              {
                comment?.user.username
              }
            </span>
            <span className="comment-timestamp">
              {
                timeAgo(comment?.createdAt)
              }
            </span>
          </div>
          <p className="comment-content">
            {
              comment?.content
            }
          </p>
        </div>
        <div className="comment-actions">
          <button className={`like-btn ${isPopping ? 'popping' : ''}`} onAnimationEnd={() => setIsPopping(false)}>
            <Heart />
            0
          </button>
          <button className="reply-btn" onClick={() => setIsReplying(!isReplying)}>
            Reply
          </button>
        </div>
        {100 > 0 && (
            <button className="view-replies-btn" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Hide replies' : `${100} ${100 > 1 ? 'replies' : 'reply'}`}
            </button>
        )}
      </div>

    </div>
  )
}

export default Comment