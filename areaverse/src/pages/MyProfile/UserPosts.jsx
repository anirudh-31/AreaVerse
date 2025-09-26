import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeAgo } from '../../utils/CommonFunctions';
import { getUserPosts } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;

    return (
        <nav>
            <ul className="pagination">
                <li><button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">{'<'}</button></li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)} className={`pagination-btn ${currentPage === number ? 'active' : ''}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li><button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} className="pagination-btn">{'>'}</button></li>
            </ul>
        </nav>
    );
};

function UserPosts() {
  const { user}                      = useSelector(state => state.auth);
  const { fetchingPosts, userPosts } = useSelector(state => state.user);
  const dispatch                     = useDispatch();
  const [pages, setPages]            = useState(null);
  const [currentPage, setCurrentPage]= useState(1);
  const navigate                     = useNavigate();

  useEffect(() => {
    dispatch(getUserPosts({
      userId: user.id,
      page  : currentPage
    }))
    
  }, [currentPage]);
  useEffect(() => {
    if(userPosts){
      setPages(userPosts.totalPages)
    }
  }, [userPosts])
  if (fetchingPosts) {
        return (
            <div className="posts-grid">
                {[...Array(3)].map((_, index) => (
                    <div className="skeleton-post-card" key={index}>
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-desc"></div>
                        <div className="skeleton skeleton-desc"></div>
                    </div>
                ))}
            </div>
        );
    }
    else if (userPosts){
      return (
        <React.Fragment>
          <div className="posts-grid">
              {userPosts?.posts?.map((post, index) => (
                  <div key={post.id} className="post-card" style={{ animationDelay: `${index * 100}ms` }} onClick={() => navigate(`/report/${post?.id}`)}>
                      <div className="post-card-redirect-icon"><ChevronRight /></div>
                      <h3 className="post-card-title">{post.title}</h3>
                      <p className="post-card-description">{post.description}</p>
                      <p className="post-card-timestamp">{timeAgo(post.createdAt)}</p>
                  </div>
              ))}
            </div>
        <Pagination postsPerPage={3} paginate={setCurrentPage} totalPosts={userPosts?.totalPosts} currentPage={currentPage}/>
      </React.Fragment>
    );
    }
}

export default UserPosts