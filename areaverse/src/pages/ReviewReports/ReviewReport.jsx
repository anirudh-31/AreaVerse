import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccessDenied from './components/AccessDenied';
import './ReviewReport.css'
import { fetchReviewReports } from '../../features/post/postSlice';
import ReviewReports from './components/ReviewReports';
import ReviewReportSkeleton from './components/ReviewReportSkeleton';
import ReportPaginator from './components/ReportPaginator';
function ReviewReport() {
  const [ pageState, setPageState ]          = useState('');
  const { user }                             = useSelector(state => state.auth);
  const { postsForReview, retrievingReview } = useSelector(state => state.post);
  const [ pageNumber, setPageNumber]         = useState(1);
  const dispatch                             = useDispatch();

  const nextPage = (page) => { setPageNumber(page); }
  

  
  useEffect(() => {
    if(user.role !== 'ADMIN'){
        setPageState('error')
    }else {
        dispatch(fetchReviewReports({
            pageId: pageNumber, 
            pageSize: 4
        }));
    }
  }, [user, pageNumber])

  function renderPage(){
    if (pageState === 'error'){
        return <AccessDenied />
    } if(retrievingReview){
      return <ReviewReportSkeleton />
    }if (postsForReview){
        return <ReviewReports reports={postsForReview?.posts} pageNumber={pageNumber} handlePageNumber={nextPage} totalPages={postsForReview?.pagination?.totalPages}/> 
    } 
  }
  
  return (
    <div className="report-review-container">
        {
            renderPage()
        }
        <ReportPaginator currentPage={pageNumber} totalPages={postsForReview?.pagination?.totalPages} nextPage={nextPage} />
    </div>
  )
}

export default ReviewReport