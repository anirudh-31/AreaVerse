import {useSwipeAnimation} from '../hooks/useSwipeAnimations'
import { stringToHex, timeAgo, triggerHaptic } from '../../../utils/CommonFunctions';
import '../styles/PostCard.css';
import { styles } from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageProgressBar from './ImageProgressBar';
import { Eye } from 'lucide-react';

function PostCard({ post, isTopCard, onSwipe, style}) {
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0);
  const [ isExpanded       , setIsExpanded        ] = useState(false);
  const [ isSlideShowPaused, setIsSlideShowPaused ] = useState(false);
  const slideShowTimer                              = useRef(null);
  const { cardRef } = useSwipeAnimation((direction ) => onSwipe(post?.id, direction), isTopCard);
  const postCreated = timeAgo(post.createdAt);
  const CHAR_LIMIT  = 120;

  const images = useMemo(() => {
    if( post?.images && post?.images.length > 0 ) return post?.images;
    if( post?.images.length === 1 ) return [post?.images?.url]
    return [];
  }, [post.images]);

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex( prev => ( prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if(isTopCard && images.length > 1 && !isSlideShowPaused){
      slideShowTimer.current = setInterval(goToNextImage, 4000);
      return () => clearInterval(slideShowTimer.current);
    }
  }, [isTopCard, images.length, isSlideShowPaused, goToNextImage]);

  const hasImages     = images.length > 0;
  const isLongContent = post.description.length > CHAR_LIMIT;

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setIsExpanded(true);
  }

  const handleImageNavigation = (e, direction) => {
    e.stopPropagation();
    setCurrentImageIndex( prev => {
      if( direction === 'next') return (prev + 1) % images.length;
      return ( prev - 1 + images.length) % images.length;
    })
    setIsSlideShowPaused(true);
    clearInterval(slideShowTimer.current);
    setTimeout(() => setIsSlideShowPaused(false), 2000);
  }

  const cardStyle = {
    ...style,
    ...styles.postCard,
    cursor            : isTopCard ? 'grab' : 'default',
    animation         : hasImages ? "none" : 'aurora 10s linear infinite',
    backgroundImage   : hasImages ? `url(${images[currentImageIndex]?.url})`: 'none',
    backgroundSize    : 'cover',
    backgroundPosition: 'center',
  }

  const contentContainerStyle = hasImages ? {
    ...styles.contentContainer,
    ...styles.tintedOverlay
  } : styles.contentContainer;
  const navigate = useNavigate();
  let eventInfo  = null;
  if (post.type === 'Event' && post.eventDate) {
    const date = post.eventDate.toLocaleDateString(); const time = post.eventTime || '';
    eventInfo = <div style={styles.eventDetails}><p style={{margin: '2px 0'}}><strong>Location:</strong> {post.eventLocation || 'N/A'}</p><p style={{margin: '2px 0'}}><strong>When:</strong> {date} at {time}</p></div>;
  }

  
  
  return (
    <div className="feed-card" ref={cardRef} data-id={post?.id} style={cardStyle}>
      {
        hasImages && images.length > 1 && (
          <>
            <ImageProgressBar count={images?.length} currentIndex={currentImageIndex} isPaused={isSlideShowPaused}/>
            <div style={styles.navLeft} onClick={(e) => handleImageNavigation(e, 'prev')}></div>
            <div style={styles.navRight} onClick={(e) => handleImageNavigation(e, 'next')}></div>
          </>
        )
      }
      <div className="view-icon-container" style={styles.viewIconContainer}>
        <div style={styles.viewIconCircle}>
          <Eye style={styles.viewIcon}/>
        </div>
      </div>
      <div className="parallax-content" style={contentContainerStyle}>
        <div style={styles.postHeader}>
            <span style={{...styles.avatar, background: stringToHex(post?.user.username)}} >
              {
                post?.user.first_name.charAt(0).toUpperCase() +( post?.user.last_name?.charAt(0).toUpperCase() || "")
              }
            </span>
            <div style={styles.userDetails}>
              <span style={{...styles.username, color: hasImages ? '#FFF' : 'var(--color-text'}}>
                {
                  post?.user?.username
                }
              </span>
              <span style={{...styles.timestamp, color: hasImages ? '#E5E7EB' : 'var(--color-text-muted)'}}>
                {
                  postCreated
                }
              </span>
            </div>
        </div>
        <div style={styles.textContent}>
            <span style={{...styles.tag, ...styles.tagType[post?.type.toLowerCase()]}}>
             {
               post?.type
             }
           </span>
            <h3 style={{...styles.postTitle, color: hasImages ? '#FFF' : 'var(--color-text)'}}>
              {post?.title}
            </h3>
            <p style={{...styles.postContent, color: hasImages ? '#FFF' : 'var(--color-text)'}}>
                {isLongContent && !isExpanded ? `${post.content.substring(0, CHAR_LIMIT)}... ` : post?.description}
                {isLongContent && !isExpanded && (
                    <button onClick={handleMoreClick} style={styles.moreButton}>more</button>
                )}
            </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard