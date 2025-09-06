import React, { useEffect, useState } from 'react'
import './MyProfile.css';
import { formatDate, stringToGradient } from '../../utils/CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../features/user/userSlice';
import { BadgeCheck, BadgeX, BriefcaseBusiness, Cake, CalendarPlus, Mail, MapPinned } from 'lucide-react';
function MyProfile() {

    const { userDetails, loading, error } = useSelector((state) => state.user);
    const [ profileEditMode , toggleProfileEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch]);

    if (loading) return (
        <div className="profile-card skeleton">
            {/* Cover */}
            <div className="skeleton-cover" />

            {/* Avatar */}
            <div className="skeleton-avatar" />

            {/* Tabs */}
            <div className="skeleton-tabs">
                <div className="skeleton-box" />
                <div className="skeleton-box" />
                <div className="skeleton-box" />
            </div>

            {/* Details */}
            <div className="skeleton-details">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
            </div>

            {/* Stats */}
            <div className="skeleton-stats">
                <div className="skeleton-box small" />
                <div className="skeleton-box small" />
                <div className="skeleton-box small" />
            </div>

            {/* Button */}
            <div className="skeleton-button" />
        </div>
    );

    if (error) return <div className="p-4">No user data found.</div>;
    return (
        <React.Fragment>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-initials-large">{userDetails?.username.charAt(0).toUpperCase()}</div>
                    <div className="profile-name-section">
                        <h1 className="profile-name">{userDetails?.first_name} {userDetails?.last_name}</h1>
                        {
                            userDetails?.isVerified ? 
                            <BadgeCheck /> :
                            <BadgeX />
                        }
                    </div>
                    <p className="profile-username">@{userDetails?.username}</p>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <div className="stat-number">00</div>
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
                </div>

                <div className="profile-content">
                    <div className="profile-tabs">
                        <div className="profile-tab active">Profile</div>
                        <div className="profile-tab">Posts</div>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <span className="detail-label">
                                <BriefcaseBusiness />
                                Profession
                            </span>
                            <span className="detail-value">{userDetails?.profession || "--"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                <Mail/>
                                E-mail
                            </span>
                            <span className="detail-value">{userDetails?.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                <Cake />
                                Date of Birth
                            </span>
                            <span className="detail-value">{formatDate(userDetails?.dateOfBirth)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                <CalendarPlus />
                                Member Since
                            </span>
                            <span className="detail-value">{formatDate(userDetails?.createdAt)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                <MapPinned />
                                Neighborhood
                            </span>
                            <span className="detail-value">{userDetails?.neighborhood.name}, {userDetails?.neighborhood.city} - {userDetails?.neighborhood.state}</span>
                        </div>
                    </div>

                    

                    <button className="edit-button">Edit Profile</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyProfile