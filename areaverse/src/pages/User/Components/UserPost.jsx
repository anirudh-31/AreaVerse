import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserPost({post, lastItemRef, index}) {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef                   = useRef(null);
    const navigate                  = useNavigate();
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (observer && observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    const combinedRef = (node) => {
        itemRef.current = node;
        if (lastItemRef) {
            lastItemRef(node);
        }
    };
    return (
        <div 
            ref={combinedRef}
            className={`post-grid-item ${isVisible ? 'visible' : ''}`}
            style={{transitionDelay: `${index % 9 * 50}ms`}}
            onClick={() => navigate(`/report/${post.id}`)}
        >
           {post.images?.length > 0 ? (
               <>
                   <img src={post?.images[0]?.url} alt="Post" />
                   <div className="post-grid-item-overlay">
                       <span className="post-grid-item-title">{post.title}</span>
                   </div>
               </>
           ) : (
               <div className="post-grid-item-text">{post.title}</div>
           )}
        </div>
    );
}

export default UserPost