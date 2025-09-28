import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccessDenied from './components/AccessDenied';
import './ReviewReport.css'
import { fetchReviewReports } from '../../features/post/postSlice';
import ReviewReports from './components/ReviewReports';
import ReviewReportSkeleton from './components/ReviewReportSkeleton';
function ReviewReport() {
  const [ pageState, setPageState ]          = useState('');
  const { user }                             = useSelector(state => state.auth);
  const { postsForReview, retrievingReview } = useSelector(state => state.post);
  const [ pageNumber, setPageNumber]         = useState(1);
  const dispatch                             = useDispatch();


  useEffect(() => {
    if(user.role !== 'ADMIN'){
        setPageState('error')
    }else {
        dispatch(fetchReviewReports({
            pageId: pageNumber, 
            pageSize: 5
        }));
    }
  }, [user])

  function renderPage(){
    if (pageState === 'error'){
        return <AccessDenied />
    } if (postsForReview){
        return <ReviewReports reports={postsForReview?.posts}/> 
    } if(retrievingReview){
      return <ReviewReportSkeleton />
    }
  }
  
  return (
    <div className="report-review-container">
        {
            renderPage()
        }
    </div>
  )
}

export default ReviewReport