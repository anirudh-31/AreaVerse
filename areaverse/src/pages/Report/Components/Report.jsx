import { Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react'
import React from 'react'
import ImageCarousel from './ImageCarousel'
import { timeAgo } from '../../../utils/CommonFunctions'
import { useSelector } from 'react-redux'
import ReviewPanel from './ReviewPanel'
import ReportStatusBar from './ReportStatusBar'

function Report({ postData }) {
    const { user } = useSelector( state => state.auth);
    return (
        <div className='content-fade-in'>
            {
                (user.role === 'ADMIN' && (postData.status === 'REPORTED' || postData.status === 'UNDER_REVIEW')) &&
                <ReviewPanel id={postData.id}/>
            }
           
            <div className="report-card">
                <div className="report-card-header">
                    <div className="user-info">
                        <span className="avatar" >{postData?.user?.first_name.charAt(0)}</span>
                        <div>
                            <p className="author-name">{postData?.user?.first_name} {postData?.user?.last_name || ''}</p>
                            <p className="report-timestamp">Reported {timeAgo(postData?.createdAt)}</p>
                        </div>
                    </div>
                </div>
                {
                    (user.role == 'ADMIN' || user.id === postData.user?.id ) &&
                    <ReportStatusBar history={postData.histories}/>
                }
                <div className="report-card-content">
                    <div className="report-body">
                        <h2 className="report-title">{postData.title || ''}</h2>
                        <p>
                            {
                                postData.description
                            }
                        </p>
                    </div>
                </div>
                <ImageCarousel images={postData.images} />
                <div className="report-footer">
                    <div className="report-stats">
                        <div className="likes">
                            <Heart />
                            <span>{postData?.stats?.likes || 0} Likes</span>
                        </div>
                        <span>{postData?.stats?.comments || 0} Comments</span>
                    </div>
                    <div className="report-actions">
                        <button className="report-action-button"><Heart /> Like</button>
                        <button className="report-action-button"><MessageCircle /> Comment</button>
                        <button className="report-action-button"><Share2 /> Share</button>
                        <button className="report-action-button"><Bookmark /> Save</button>
                    </div>
                </div>
            </div>
            <div className="report-card comments-section">
                <h3 className="comments-title">Comments ({postData?.stats?.comments || 0})</h3>
                <div className="add-comment">
                    <div className="user-avatar-initial">T</div>
                    <div className="comment-form">
                        <textarea className="comment-textarea" rows="3" placeholder="Write a comment..."></textarea>
                        <button className="btn">Post Comment</button>
                    </div>
                </div>
                <div className="comments-list">
                    {postData?.comments?.map(comment => (
                        <div key={comment.id} className={`comment ${comment.isReply ? 'comment-reply' : ''}`}>
                            <img className="avatar" src={comment.author.avatar} alt={`${comment.author.name} avatar`} />
                            <div className="comment-body">
                                <div className="comment-header">
                                    <p className="comment-author">
                                        {comment.author.name}
                                        {comment.author.isAuthor && <span className="comment-author-tag">(Author)</span>}
                                    </p>
                                    <p className="comment-timestamp">{comment.timestamp}</p>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Report