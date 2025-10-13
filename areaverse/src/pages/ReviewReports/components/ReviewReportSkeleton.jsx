import React from 'react'

function ReviewReportSkeleton() {
  return (
    <>
      <div className="review-page-header">
                  <h2 className="review-page-title">Pending Reviews</h2>
                  <p className="review-page-subtitle">Select a post to review and approve or reject it.</p>
              </div>
      <div className="review-list">
          <div className="review-skeleton review-skeleton-ribbon"></div>
          <div className="review-skeleton review-skeleton-ribbon"></div>
          <div className="review-skeleton review-skeleton-ribbon"></div>
          <div className="review-skeleton review-skeleton-ribbon"></div>
      </div>
    </>
  )
}

export default ReviewReportSkeleton