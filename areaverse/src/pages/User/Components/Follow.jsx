import { Check, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import api from '../../../api/axios';

function Follow({ following, idToFollow, setFollowOp, setNotify, setMessage }) {
  const [isFollowing, setIsFollowing] = useState(following);
  const [isLoading  , setIsLoading  ] = useState(false);
  const [error      , setError      ] = useState(false);
  const [status     , setStatus     ] = useState("");

    
  
  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(false);
    
    // Optimistic UI update for the animation
    const intendedToFollow = !isFollowing;
    setIsFollowing(intendedToFollow);
    let response;
    try {
      if(following){
        response = await api.delete(`/follow/${idToFollow}`);
        setMessage(response?.data?.message);
        setNotify(true);
      }else{
        response = await api.post(`/follow/${idToFollow}`);
        setMessage(response?.data?.message);
        setNotify(true);
      }
      // Success! State is already what we want.
    } catch (error) {
      console.error("API call failed, reverting.");
      setIsFollowing(!intendedToFollow);
      setMessage(response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  // Clear error state after animation
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const buttonClasses = `follow-button ${isFollowing ? 'is-following' : ''} ${isLoading ? 'is-loading' : ''} ${error ? 'has-error' : ''}`;
  return (
    <button className={buttonClasses} onClick={handleClick} disabled={isLoading}>
      <div className="liquid-wave"></div>
      <div className="button-content">
        {isFollowing ? (
          <>
            <Check className='icon-check'/>
            <X className='icon-unfollow'/>
            <span className="text-following">Following</span>
            <span className="text-unfollow">Unfollow</span>
          </>
        ) : (
          <>
            <Plus />
            <span>Follow</span>
          </>
        )}
      </div>
    </button>
  )
}

export default Follow