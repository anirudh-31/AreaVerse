import React from 'react'
import ReportRibbon from './ReportRibbon'
import { timeAgo } from '../../../utils/CommonFunctions'

function ReviewReports({ reports }) {
    return (
        <>
            <div className="review-page-header">
                <h2 className="review-page-title">Pending Reviews</h2>
                <p className="review-page-subtitle">Select a post to review and approve or reject it.</p>
            </div>
            <div className="review-list">
                {reports.map((report, idx) => (
                    <ReportRibbon
                        key={idx}
                        title={report.title}
                        postId={report.id}
                        author={report.user.first_name + " " + report.user.last_name || ""}
                        time={timeAgo(report.createdAt)}
                    />
                ))}
            </div>
        </>
    )
}

export default ReviewReports