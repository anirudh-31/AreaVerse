import React, { useEffect, useState } from 'react'
import Comment from './Comment';

function CommentWithAnimation({ comment, delay= 0, postId }) {
    const [ inView, setInView ] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setInView(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);
  return (
    <div className={`comment-enter ${inView ? 'comment-enter-active' : ''}`}>
        <Comment comment={comment} postId={postId}/>
    </div>
  )
}

export default CommentWithAnimation