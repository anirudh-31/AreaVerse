import React, { useCallback, useEffect, useRef, useState } from 'react';
import './CommentSection.css';
import CommentForm from './CommentForm';
import api from '../../../../api/axios';
import ShuffleNumber from '../../../User/Components/ShuffleNumber';
import { ChevronDown } from 'lucide-react';
import CommentWithAnimation from './CommentWithAnimation';
import { triggerHaptic } from '../../../../utils/CommonFunctions';

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
function CommentSection({ userInfo, postId, setCommentCount, commentCount }) {
  const [commentsList   , setCommentsList      ] = useState([]);
  const [displayComments, toggleDisplayComments] = useState(true);
  const [currentPage    , setCurrentPage       ] = useState(1);
  const [resultLimit    , setResultLimit       ] = useState(3)
  const [loadingComments, setLoadingComments   ] = useState(false);
  const [commentLimitMet, setCommentLimitMet   ] = useState(false);
  const [loadingNewCmnts, setLoadingNewCmnts   ] = useState(false);
  const lastCommentObserver = useRef();

  const lastCommentRef = useCallback((node) => {
    if(loadingComments) return;
    if(lastCommentObserver.current) lastCommentObserver.current.disconnect();
    lastCommentObserver.current = new IntersectionObserver( entries => {
      if (entries[0].isIntersecting && !commentLimitMet){
        setCurrentPage( currPage => currPage + 1);
      }
    });
    if (node) {
      lastCommentObserver.current.observe(node);
    }
  }, [loadingComments, commentLimitMet]);

  useEffect(() => {
    const fetchComments = async () => {
      if (commentsList.length === 0) {
        try {
          setLoadingComments(true);
          const response = await api.get(`/comment/list?postId=${postId}&page=${currentPage}&limit=${resultLimit}`);
          const data     = response?.data;
          setCommentsList([...data.comments])
          setCommentLimitMet(data?.pagination?.totalPages === currentPage);
          setLoadingComments(false);
        } catch (error) {
          setLoadingComments(false);
          console.error("Failed to fetch comments:", error);
        }
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingNewCmnts(true);
        const response = await api.get(`/comment/list?postId=${postId}&page=${currentPage}&limit=${resultLimit}`);
        const data     = response?.data;
        setCommentsList([...commentsList, ...data.comments])
        setLoadingNewCmnts(false);
        setCommentLimitMet(data?.pagination?.totalPages === currentPage);
      } catch (error) {
        setLoadingNewCmnts(false);
      }
    }
     if(currentPage > 1 && !commentLimitMet && !loadingNewCmnts){
      fetchComments();
    }
  },[currentPage])


  async function writeNewComment(commentText){
    triggerHaptic('light');
    const payload = {
      'postId'  : postId,
      'content' : commentText,
      'parentId': null
    }
    let status = {};
    try {
      const response = await api.post("/comment/", payload);
      const status   = response?.data;
      setCommentsList([status?.newComment, ...commentsList])
      setCommentCount(status.totalComments)
      return status;
    }catch(error){
      console.log(error)
    }  

  }
  return (
    <div className="comment-section-container">
        <div className="comments-wrapper">
            <CommentForm userInfo={userInfo} writeNewComment={writeNewComment}/>
            <div id="comments-section" className="comment-card">
              <div className="comments-header">
                <h2> Comments <span>({commentCount})</span></h2>
                <button className={`collapse-btn ${!displayComments ? 'is-collapsed' : ''}`} onClick={() => toggleDisplayComments(!displayComments)}>
                  <ChevronDown />
                </button>
              </div>
              <div className={`comments-list-wrapper ${!displayComments ? 'is-collapsed' : ''}`}>
                <div className="comments-list">
                  {
                    loadingComments ? (
                      <>
                      <SkeletonComment />
                      <SkeletonComment />
                      <SkeletonComment />
                      </>
                    ) : (
                      commentsList.map((comment, index) => {
                        if (commentsList.length === index + 1) {
                              return (
                              <div ref={lastCommentRef} key={comment.id}>
                                  <CommentWithAnimation comment={comment} postId={postId}/>
                              </div>
                              );
                          } else {
                              return (
                                  <CommentWithAnimation key={comment.id} comment={comment} postId={postId}/>
                              );
                          }
                      })
                    )
                  }
                  {
                    loadingNewCmnts && <SkeletonComment />
                  }
                  {commentLimitMet && (
                    <p style={{textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '0.5rem'}}>
                        You've reached the end!
                    </p>
                  )}
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CommentSection