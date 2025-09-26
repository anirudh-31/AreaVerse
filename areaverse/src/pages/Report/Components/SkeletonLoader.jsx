import React from 'react'

function SkeletonLoader() {
    return (
        <div id="report-skeleton-loader">
            <div className="report-card">
                <div className="report-card-header">
                    <div className="user-info">
                        <div className="report-skeleton report-skeleton-avatar"></div>
                        <div style={{ flex: 1 }}>
                            <div className="report-skeleton report-skeleton-text" style={{ width: '40%', marginBottom: '0.5rem' }}></div>
                            <div className="report-skeleton report-skeleton-text" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                </div>
                <div className="report-card-content">
                    <div className="report-skeleton report-skeleton-text" style={{ width: '60%', height: '1.75rem', marginBottom: '1rem' }}></div>
                    <div className="report-skeleton report-skeleton-text" style={{ width: '90%', marginBottom: '0.5rem' }}></div>
                    <div className="report-skeleton report-skeleton-text" style={{ width: '80%' }}></div>
                </div>
                <div className="report-skeleton report-skeleton-image"></div>
                <div className="post-footer">
                    <div className="post-actions" style={{ borderBottom: 'none' }}>
                        <div className="report-skeleton report-skeleton-button" style={{ margin: '0.5rem 1.25rem' }}></div>
                        <div className="report-skeleton report-skeleton-button" style={{ margin: '0.5rem 1.25rem' }}></div>
                        <div className="report-skeleton report-skeleton-button" style={{ margin: '0.5rem 1.25rem' }}></div>
                        <div className="report-skeleton report-skeleton-button" style={{ margin: '0.5rem 1.25rem' }}></div>
                    </div>
                </div>
            </div>
            <div className="report-card comments-section" style={{ marginTop: '2rem' }}>
                <div className="report-skeleton report-skeleton-text" style={{ width: '30%', height: '1.5rem', marginBottom: '1.5rem' }}></div>
                <div className="comment" style={{ marginBottom: '1.5rem' }}>
                    <div className="report-skeleton report-skeleton-avatar" style={{ width: '2.5rem', height: '2.5rem' }}></div>
                    <div style={{ flex: 1 }}>
                        <div className="report-skeleton report-skeleton-text" style={{ width: '90%', marginBottom: '0.5rem' }}></div>
                        <div className="report-skeleton report-skeleton-text" style={{ width: '60%' }}></div>
                    </div>
                </div>
                <div className="comment">
                    <div className="report-skeleton report-skeleton-avatar" style={{ width: '2.5rem', height: '2.5rem' }}></div>
                    <div style={{ flex: 1 }}>
                        <div className="report-skeleton report-skeleton-text" style={{ width: '85%', marginBottom: '0.5rem' }}></div>
                        <div className="report-skeleton report-skeleton-text" style={{ width: '70%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoader