import React, { useEffect, useState } from 'react'
import Comment from './Comment';

function CommentWithAnimation({ comment, delay= 0}) {
    const [ inView, setInView ] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setInView(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);
  return (
    <div className={`comment-enter ${inView ? 'comment-enter-active' : ''}`}>
        <Comment comment={comment} />
    </div>
  )
}

export default CommentWithAnimation