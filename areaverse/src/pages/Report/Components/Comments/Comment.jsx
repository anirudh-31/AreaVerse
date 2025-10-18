import React, { useCallback, useEffect, useRef, useState } from 'react'
import { timeAgo } from '../../../../utils/CommonFunctions';
import { Heart } from 'lucide-react';
import ReplyForm from './ReplyForm';
import api from '../../../../api/axios';
import CommentWithAnimation from './CommentWithAnimation';

const SkeletonComment = () => {
  return (<div className="comment">
        <div className="skeleton avatar"></div>
        <div className="comment-content" style={{ flex: 1 }}>
            <div className="skeleton line" style={{ width: '30%', marginBottom: '0.75rem' }}></div>
            <div className="skeleton line-sm" style={{ width: '90%' }}></div>
            <div className="skeleton line-sm" style={{ width: '70%', marginTop: '0.5rem' }}></div>
        </div>
    </div>)
}

function Comment({ comment, postId }) {
  const [ isLiked    , setIsLiked    ] = useState(false);
  const [ likeCount  , setLikeCount  ] = useState(comment.likes);
  const [ isPopping  , setIsPopping  ] = useState(false);
  const [ showReplies, setShowReplies] = useState(false);
  const [ isReplying , setIsReplying ] = useState(false);
  const [ replies    , setReplies    ] = useState(comment.replies || []);
  const [ newReplyId , setNewReplyId ] = useState(null);
  const [ replyCount , setReplyCount ] = useState(comment?.replyCount)
  const [ loadingRply, setLoadingRply] = useState(false);
  const [ replyLimMet, setReplyLimMet] = useState(false);
  const [ currRplyPg , setCurrRplyPg ] = useState(1);
  const [ ldngNewRply, setLdngNewRply] = useState(false);
  const lastReplyObserver = useRef();
  const lastReplyRef      = useCallback((node) => {
    if(loadingRply) return;
    if(lastReplyObserver.current) lastReplyObserver.current.disconnect();

    lastReplyObserver.current = new IntersectionObserver( entries => {
      if(entries[0].isIntersecting && !replyLimMet){
        setCurrRplyPg( curr => curr + 1);
      }
    });

    if (node) {
      lastReplyObserver.current.observe(node);
    }
  }, [loadingRply, replyLimMet]);

  useEffect(() => {
    const fetchReplies = async () => {
      if( replies.length === 0 && replyCount > 0 && !loadingRply){
        try {
          const {id} = comment;
          setLoadingRply(true);
          const response = await api.get(`/comment/replies/${id}?page=${currRplyPg}&limit=3`);
          const data = response?.data;
          setLoadingRply(false);
          setReplies(data?.replies);
          setReplyLimMet(data.pagination.totalComments === currRplyPg);
        }catch(err) {
          console.log(err)
        }
      }
    };
    fetchReplies();
  }, [])

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const {id} = comment;
        setLdngNewRply(true);
        const response = await api.get(`/comment/replies/${id}?page=${currRplyPg}&limit=3`);
        const data = response?.data;
        setLdngNewRply(false);
        setReplies([...replies, ...data.replies]);
        setReplyLimMet(data?.pagination?.totalPages === currRplyPg)
      }catch(err) {
        console.log(err)
      }
    };
    if( currRplyPg > 1 && !replyLimMet && !ldngNewRply){
      fetchReplies();
    }
  }, [currRplyPg])

  const handleReply = async ( content ) => {
    const { id }  = comment;
    const payload = {
      postId,
      parentId: id,
      content,
    }
    let status = {};
    try {
      const response = await api.post("/comment/", payload);
      status = response?.data;
      setReplies([{...status.newComment}, ...replies]);
      setIsReplying(false);
      setShowReplies(true);
      setReplyCount(status?.totalComments)
      console.log(status?.totalComments)
    }catch(error){
      
    }  
    return status;
  }

  
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
          {
            !comment.isReply && (
              <button className="reply-btn" onClick={() => setIsReplying(!isReplying)}>
                Reply
              </button>
            )
          }
        </div>
        { replyCount > 0 && (
            <button className="view-replies-btn" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Hide replies' : `${replyCount} ${replyCount > 1 ? 'replies' : 'reply'}`}
            </button>
        )}
        {
          isReplying && ( 
            <ReplyForm onCancel={() => setIsReplying(false)} replyingTo={comment?.user.username} onSubmit={handleReply}/>
          )
        }
        {
          showReplies && (
            <div className="replies-container">
              {
                loadingRply ? (
                  <>
                  <SkeletonComment />
                  </>                  
                ) : (
                    replies.map((reply, i) => {
                      // return <CommentWithAnimation key={i} comment={{...reply, isReply: true}} delay={i * 100}/>
                      if (replies.length === i + 1) {
                              return (
                              <div ref={lastReplyRef} key={i}>
                                  <CommentWithAnimation comment={{...reply, isReply: true}} delay={i*100}/>
                              </div>
                              );
                          } else {
                              return (
                                  <CommentWithAnimation key={i} comment={{...reply, isReply: true}} delay={i*100}/>
                              );
                          }
                    })
                )
              }
              {
                ldngNewRply && ( <SkeletonComment />)
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Comment