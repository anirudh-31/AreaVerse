import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeFeed, swipe } from '../../../features/feed/feedSlice';
import PostCard from './PostCard';
import { styles } from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import { triggerHaptic } from '../../../utils/CommonFunctions';

function CardStack() {
  const { posts, page, limit, loading }       = useSelector(state => state.feed);
  const dispatch                              = useDispatch();
  const navigate                              = useNavigate();
  const isLoadingMore                         = useRef(null);
  const [ animationState, setAnimationState ] = useState({
    mounted : false,
    complete: false,
  });


  useEffect(() => {
    if( posts.length === 0 && !loading ){
        dispatch(getHomeFeed({
            page : page,
            limit: limit,
            })
        );
    }
    const mountTimer = setTimeout(() => setAnimationState( s => ({...s, mounted: true})), 100);

    const completeTimer = setTimeout(() => setAnimationState(s => ({ ...s, complete: true})), (posts.length * 180) + 700)

    return () => {
        clearTimeout(mountTimer);
        clearTimeout(completeTimer);
    }
  },[]);

  const loadMore  = () => {
    if (isLoadingMore.current) return;
    isLoadingMore.current = true;
    dispatch(getHomeFeed({
        page : page,
        limit: limit,
    }))
    isLoadingMore.current = false;
  }

  useEffect(() => {
        if (posts.length > 0 && posts.length <= 2 && !loading) {
            loadMore();
        }
    }, [posts.length]);

    const handleSwipe = (postToView, direction) => {
        triggerHaptic('light');
        if(direction === 'left' || direction === 'right'){
            navigate(`/report/${postToView}`);
        }else {
            dispatch(swipe());
        }
        
    }
  return (
    <div className='card-stack' style={styles.cardStack}>
          {posts.map((post, index) => {
                const isTopCard  = index === 0;
                const isSwipable = isTopCard && animationState.complete;
                const { mounted, complete } = animationState;
                
                const style = {
                    // Final position
                    transform: index < 2 ? `translateY(${index * 18}px) scale(${1 - (index * 0.04)})`: `translateY(0px) scale(0)`,
                    opacity: 1,
                    zIndex: posts.length - index,
                };

                if (!mounted) {
                    // Initial, off-screen position before animation starts
                    style.transform = 'translateY(-40vh) scale(0.7)';
                    style.opacity = 0;
                }

                if (isSwipable) {
                    // Once interactive, the top card is controlled by physics, not CSS transitions
                    style.transition = 'none';
                } else if (mounted && !complete) {
                    // During the initial entrance animation
                    style.transition = `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease`;
                    style.transitionDelay = `${index * 200}ms`;
                } else {
                    // For cards moving up the stack after a swipe
                    style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
                }

                return <PostCard key={post.id} post={post} style={style} isTopCard={isSwipable} onSwipe={handleSwipe} />;
            })}
            { loading && <div style={styles.loader}>Loading posts.</div> }
            {posts.length === 0 && !loading && <div style={styles.loader}>No more posts.</div>}
            
    </div>
  )
}

export default CardStack