import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import MyProfile from '../MyProfile/MyProfile';
import api from '../../api/axios';
import './User.css'
import { BadgeCheck, User2 } from 'lucide-react';
import ShuffleNumber from './Components/ShuffleNumber';
import { formatDate } from '../../utils/CommonFunctions';
import UserPost from './Components/UserPost';
import Follow from './Components/Follow';
import FollowNotification from './Components/FollowNotification';

function User() {
    const params = useParams();
    const userId = params.id;
    const { user } = useSelector(state => state.auth);

    const [ userData    , setUserData     ] = useState({});
    const [ userPosts   , setUserPosts    ] = useState([]);
    const [ postsPage   , setPostsPage    ] = useState(1);
    const [ loadingUser , setLoadingUser  ] = useState(false);
    const [ loadingPosts, setLoadingPosts ] = useState(false);
    const [ hasMorePosts, setHasMorePosts ] = useState(true);
    const [ notify      , setNotify       ] = useState(false);
    const [ message     , setMessage      ] = useState("")
    
    useEffect(() => {
      if (notify) {
        const timer = setTimeout(() => {
          setNotify(false);
          api.get(`/user/${userId}`).then((response) => {
          setUserData({...response?.data})
        })
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [notify])

    const observerRef = useRef();
    const lastPostRef = useCallback( node => {
      if(loadingPosts) return;
      if(observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver( entries => {
        if(entries[0].isIntersecting && hasMorePosts){
          setPostsPage(currPage => currPage + 1)
        }
      });
      if(node) observerRef.current.observe(node);
    }, [loadingPosts, hasMorePosts]);


    useEffect(() => {
        setLoadingUser(true);
        api.get(`/user/${userId}`).then((response) => {
          setUserData({...response?.data})
          setLoadingUser(false);
        }).catch((err) => {
          console.log(err);
          setLoadingUser(false);
        });
        
    }, [])

    useEffect(() => {
      setLoadingPosts(true);
      api.get(`/report/user/${userId}?page=${postsPage}&limit=3`).then((response) => {
        const total = response?.data?.totalPages;
        const posts = response?.data?.posts;
        setHasMorePosts((postsPage < total) && posts?.length > 0);
        setLoadingPosts(false);
        if(userPosts.length > 0){
          setUserPosts(currPosts => [...currPosts, ...posts]);
        }else{
          setUserPosts([...response?.data?.posts])
        }
      }).catch((err) => {
        console.log(err);
        setLoadingPosts(false);
      })
    }, [postsPage])

    
    if(user.id === userId){
        return <MyProfile />
    }  
    if(loadingUser){
      return (
        <div className="user-page">
          <div className="user-page-content">
            <div className="user-banner skeleton"></div>
            <div className="user-profile-details">
              <div className="user-profile-avatar skeleton"></div>
              <div className="skeleton-text-group center">
                <div className="skeleton-text title" style={{ width: '40%', height: '32px' }}></div>
                <div className="skeleton-text subtitle" style={{ width: '30%', height: '16px' }}></div>
              </div>
            </div>
            <div className="user-page-info-card skeleton-item">
              <div className="skeleton-text-group">
                <div className="skeleton-text title"></div>
                <div className="skeleton-text subtitle"></div>
              </div>
            </div>
            <h2 className="user-page-grid-header skeleton-text" style={{ width: '120px', height: '22px' }}></h2>
            <div className="user-page-posts-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="grid-item skeleton" key={i}></div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  return (
    <React.Fragment>
      <div className="user-page">
        <div className="user-page-header">

        </div>
        <div className="user-page-content">
          <div className="user-banner"/>
          <div className="user-profile-details">
            <div className="user-profile-avatar">
                {
                  userData?.first_name?.charAt(0).toUpperCase()
                }
            </div>
            <h1 className="user-profile-name">
              {userData?.first_name} {userData?.last_name}
              {
                userData?.isVerified && 
                <span className="verified-badge" title="Verified User">
                    <BadgeCheck />
                </span>
              }
            </h1>
            <p className="user-profile-username">
              @{userData.username}
            </p>
            <p className="user-profile-bio">
              
            </p>
            <div className="user-profile-stats">
              <div>
                <ShuffleNumber value={userData?.postCount} />
                <span>Posts</span>
              </div>
              <div>
                <ShuffleNumber value={userData?.followers} />
                {/* <ShuffleNumber value={123456789} /> */}
                <span>Followers</span>
              </div>
              <div>
                <ShuffleNumber value={userData?.following} />
                <span>Following</span>
              </div>
            </div>
            <div className="user-profile-actions">
              <Follow following={userData?.isFollowingUser} idToFollow={userId} setMessage={setMessage} setNotify={setNotify}/>
            </div>
          </div>
          <div className="profile-info-card">
              <h2 className="info-card-header">
                  <div className="info-card-header-icon">
                    <User2 />
                  </div>
                  <span>User Information</span>
              </h2>
              <div className="profile-info-grid">
                  <div className="info-item">
                      <strong>First Name</strong>
                      <span>{userData?.first_name}</span>
                  </div>
                  <div className="info-item">
                      <strong>Last Name</strong>
                      <span>{userData?.last_name}</span>
                  </div>
                  <div className="info-item">
                      <strong>Profession</strong>
                      <span>{userData?.profession || '-'} </span>
                  </div>
                  <div className="info-item">
                      <strong>Neighborhood</strong>
                      <span>{userData?.neighborhood?.name}, {userData?.neighborhood?.city} - {userData?.neighborhood?.state}</span>
                  </div>
                  <div className="info-item">
                      <strong>Date of Birth</strong>
                      <span>{formatDate(userData?.dateOfBirth)}</span>
                  </div>
                  <div className="info-item">
                      <strong>Member since</strong>
                      <span>{formatDate(userData?.createdAt)}</span>
                  </div>
              </div>
          </div>
          <h2 className="profile-grid-header">User's Posts</h2>
          <div className="user-page-posts-grid">
            {
              userPosts.map((post, index) => (
                <UserPost 
                            key={post.id} 
                            post={post} 
                            index={index} 
                            lastItemRef={userPosts.length === index + 1 ? lastPostRef : null}
                        />
              ))
            }
            {loadingPosts && Array.from({ length: 3 }).map((_, i) => (
                      <div className="post-grid-item skeleton" key={`skeleton-${i}`}></div>
            ))}
          </div>
          {!loadingPosts && userPosts.length === 0 && (
              <div className="profile-posts-empty-state">
                  <div className="empty-state-icon">
                    📝
                  </div>
                  <h3>No Posts Yet</h3>
                  <p>When this user shares a post, it will appear here.</p>
              </div>
          )}
        </div>
      </div>
      <FollowNotification message={message} type='success' isVisible={notify}/>
    </React.Fragment>
  )
}

export default User