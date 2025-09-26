import React, { useEffect, useState } from 'react'
import './MyProfile.css';
import { formatDate, stringToGradient } from '../../utils/CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../features/user/userSlice';
import { BadgeCheck, BadgeX, BriefcaseBusiness, Cake, CalendarPlus, Mail, MapPinned, Pencil, PlusIcon } from 'lucide-react';
import ProfileDetails from './ProfileDetails';
import UserPosts from './UserPosts';
function MyProfile() {

    const { userDetails, loading, error }            = useSelector((state) => state.user);
    const { user }                                   = useSelector((state) => state.auth)
    const [ profileEditMode , toggleProfileEditMode] = useState(false);
    const dispatch                                   = useDispatch();
    const [activeTab, setActiveTab]                  = useState('profile');
    const [isEditModalOpen, setEditModalOpen]        = useState(false);

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    if (loading) return (
        <div className="profile-card">
            <div className="profile-header"></div>
            <div className="profile-core">
                <div className="avatar-wrapper">
                    <div className="profile-avatar skeleton" style={{borderRadius: '50%'}}></div>
                </div>
                <div className="skeleton" style={{ height: '28px', width: '200px', marginBottom: '0.5rem' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '150px', marginBottom: '1.5rem' }}></div>
                <div className="profile-stats">
                    <div className="stat-item"><div className="skeleton" style={{ height: '20px', width: '30px', margin: '0 auto 0.25rem' }}></div><div className="skeleton" style={{ height: '14px', width: '50px', margin: '0 auto' }}></div></div>
                    <div className="stat-item"><div className="skeleton" style={{ height: '20px', width: '30px', margin: '0 auto 0.25rem' }}></div><div className="skeleton" style={{ height: '14px', width: '60px', margin: '0 auto' }}></div></div>
                    <div className="stat-item"><div className="skeleton" style={{ height: '20px', width: '30px', margin: '0 auto 0.25rem' }}></div><div className="skeleton" style={{ height: '14px', width: '60px', margin: '0 auto' }}></div></div>
                </div>
            </div>
            <div className="profile-tabs"><div className="tab-btn"></div><div className="tab-btn"></div></div>
            <div className="tab-content"></div>
        </div>
    );

    if (error) return <div className="p-4">No user data found.</div>;
    return (
        <React.Fragment>
            <div className="profile-page-container">
                <div className="profile-card">
                    <div className="profile-header"/>
                    <div className="profile-core">
                        <div className="avatar-wrapper">
                            <div className="profile-avatar">{userDetails?.first_name.charAt(0).toUpperCase()}</div>
                        </div>
                        <h1 className="user-name">{userDetails?.first_name} {userDetails?.last_name}</h1>
                        <p className="user-handle">@{userDetails?.username}</p>
                        <div className="profile-stats">
                            <div className="stat-item">
                                <div className="stat-number">
                                    {
                                        userDetails?.postCount.length > 1 ?
                                        userDetails?.postCount :
                                        '0'.concat(userDetails?.postCount)
                                    }
                                </div>
                                <div className="stat-label">Posts</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">00</div>
                                <div className="stat-label">Followers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">00</div>
                                <div className="stat-label">Following</div>
                            </div>
                        </div>
                        <div className="profile-actions">
                            {
                               ( userDetails?.id !== user.id) &&< button className="action-btn"><PlusIcon /> Follow</button>
                            }
                            <button className="action-btn" onClick={() => setEditModalOpen(true)}><Pencil /> Edit Profile</button>
                        </div>
                    </div>
                    <nav className="profile-tabs">
                        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</button>
                        <button className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Posts</button>
                    </nav>
                    <div className="tab-content">
                        {activeTab === 'profile' && <ProfileDetails user={userDetails} />}
                        {activeTab === 'posts' && <UserPosts   />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyProfile