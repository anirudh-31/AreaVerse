import { ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function ReportRibbon({title , author, time, postId}) {
    const navigate = useNavigate()
    return (
        <div className="review-ribbon" onClick={() => navigate(`/report/${postId}`)}>
            <div className="ribbon-header">
                <div>
                    <h3 className="ribbon-title">{title}</h3>
                    <p className="ribbon-meta">
                        Submitted by <span className="author">{author}</span> &bull; {time}
                    </p>
                </div>
                <div className="ribbon-chevron">
                    <ChevronRightIcon />
                </div>
            </div>
        </div>
    )
}

export default ReportRibbon