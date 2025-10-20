import { Bookmark, Heart, MessageCircle, Share2, Tag, TriangleAlert } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import ImageCarousel from './ImageCarousel'
import { timeAgo } from '../../../utils/CommonFunctions'
import { useSelector } from 'react-redux'
import ReviewPanel from './ReviewPanel'
import ReportStatusBar from './ReportStatusBar'
import { useNavigate } from 'react-router-dom'
import ShuffleNumber from '../../User/Components/ShuffleNumber'
import api from '../../../api/axios'
import CommentSection from './Comments/CommentSection'

const HeartIcon = () => (
    <svg viewBox="0 0 24 24">
        <defs>
            <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#FF8A8A', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
            </radialGradient>
            <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="rgba(239, 68, 68, 0.7)" />
            </filter>
        </defs>
        <path fill="url(#heartGradient)" filter="url(#heartGlow)" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>
)

function Report({ postData }) {
    const [ likesData  , setLikesData  ] = useState(postData?.likes);
    const [ commentData, setCommentData] = useState(postData?.commentCount);
    const [ showHeart  , setShowHeart  ] = useState(false);
    const [ likeAnims  , setLikeAnims  ] = useState([]);
    const { user }                    = useSelector( state => state.auth);
    const likeButtonRef               = useRef(null);
    const navigate                    = useNavigate();
    
    function navigateToUser() {
        navigate(`/user/${postData?.user?.id}`)
    }

    async function updateLikes() {
        const response = await api.post(`/like/${postData?.id}`);
        const data     = response?.data;
        setLikesData({
            likeCount: data.likeCount,
            likedByUser: data.liked
        });
    }

    useEffect(() => {
        const recordEngagement = async () => {
            try {
                const response = await api.post(`/engagement/view/${postData?.id}`);
            } catch (error) {
                console.log(error);
            }
        };

        recordEngagement();
    }, [])
    async function handleDoubleClick(){
        if(!likesData.likedByUser){
            await updateLikes();
        }
        setShowHeart(true);
        setTimeout(() => {
            setShowHeart(false);
        }, 900);
    }

    async function handleLike(){
        setLikesData(prev => {
            if (!prev) return prev;
            const wasLiked = prev.likedByUser;
            if (!wasLiked && likeButtonRef.current) {
                const rect   = likeButtonRef.current.getBoundingClientRect();
                const startX = rect.left + rect.width  / 2;
                const startY = rect.top  + rect.height / 2;
                
                const endX = window.innerWidth  / 2 - startX;
                const endY = window.innerHeight / 2 - startY;

                setLikeAnims(anims => [...anims, { id: Date.now() + Math.random(), startX, startY, endX, endY }]);
            }
            return {
                ...prev,
            };
        });
        await updateLikes();
    }
    return (
        <div className='content-fade-in'>
            {
                (user.role === 'ADMIN' && (postData.status === 'REPORTED' || postData.status === 'UNDER_REVIEW' || postData.status == 'UPDATED')) &&
                <ReviewPanel id={postData.id}/>
            }
           
            <div className="report-card">
                <div className="report-card-header">
                    <div className="user-info">
                        <span className="avatar" onClick={navigateToUser}>{postData?.user?.first_name.charAt(0)}</span>
                        <div>
                            <p className="author-name" onClick={navigateToUser}>{postData?.user?.first_name} {postData?.user?.last_name || ''}</p>
                            <p className="report-timestamp">Reported {timeAgo(postData?.createdAt)}</p>
                        </div>
                    </div>
                </div>
                {
                    (user.role == 'ADMIN' || user.id === postData.user?.id ) &&
                    <ReportStatusBar history={postData.histories} creator={postData.user?.id}/>
                }
                <div className="report-card-content">
                    <div className="report-body">
                        <h2 className="report-title">{postData.title || ''}</h2>
                        <div className="post-tags">
                             <div className="post-tags">
                                {postData?.severity && <span className={`tag tag-severity-${postData?.severity?.toLowerCase()}`}><TriangleAlert /> {postData?.severity}</span>}
                                {postData?.category && <span className="tag tag-category"><Bookmark /> {postData?.category}</span>}
                                {postData?.type     && <span className="tag tag-type"><Tag /> {postData?.type}</span>}
                            </div>
                        </div>
                        <p>
                            {
                                postData.description
                            }
                        </p>
                    </div>
                </div>
                <div onDoubleClick={handleDoubleClick}>
                    <ImageCarousel images={postData.images} />
                    {
                        showHeart &&
                        <div className="image-heart-overlay">
                            <div className="image-heart animate">
                                <HeartIcon />
                                
                            </div>
                        </div>
                    }
                </div>
                <div className="report-footer">
                    <div className="report-stats">
                        <div className="likes">
                            <Heart />
                            <ShuffleNumber value={likesData?.likeCount}/>
                            <span> Likes</span>
                        </div>
                        <div className="likes">
                            <ShuffleNumber value={commentData}/>
                            <span> Comments</span>
                        </div>
                    </div>
                    <div className="report-actions">
                        <button className="report-action-button" onClick={handleLike} ref={likeButtonRef}><Heart stroke={likesData?.likedByUser ? '#ef4444' : '#fff'} fill={likesData?.likedByUser ? '#ef4444' : 'transparent'}/> {likesData?.likedByUser ? 'Liked' : 'Like'}</button>
                        <button className="report-action-button"><MessageCircle /> Comment</button>
                        <button className="report-action-button"><Share2 /> Share</button>
                        <button className="report-action-button"><Bookmark /> Save</button>
                    </div>
                </div>
            </div>
            <CommentSection userInfo={user} postId={postData.id} setCommentCount={setCommentData} commentCount={commentData}/>
            <div className="floating-hearts-container">
                {likeAnims.map(anim => (
                    <div 
                        key={anim.id} 
                        className="like-anim-heart" 
                        style={{
                            top: `${anim.startY}px`,
                            left: `${anim.startX}px`,
                            '--endX': `${anim.endX}px`,
                            '--endY': `${anim.endY}px`,
                        }}
                        onAnimationEnd={() => setLikeAnims(anims => anims.filter(a => a.id !== anim.id))}>
                        <HeartIcon />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Report