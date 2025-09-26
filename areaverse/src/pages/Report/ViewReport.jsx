import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { retrievePost } from '../../features/post/postSlice';
import './ViewReport.css';
import SkeletonLoader from './Components/SkeletonLoader';
import Report from './Components/Report';
function ViewReport() {
  const { reportId } = useParams();
  const dispatch     = useDispatch();

  const { retrieving, retieveError, post } = useSelector((state) => state.post);

  useEffect(() => {
    if(reportId){
      dispatch(retrievePost(reportId));
    }
  }, [reportId])

  function renderContent(){
    if(retrieving){
      return <SkeletonLoader />
    }
    if(post){
      return <Report postData={post} />
    }
  }
  return (
    <div className="report-container">
      {
        renderContent()
      }
    </div>
  )
}

export default ViewReport