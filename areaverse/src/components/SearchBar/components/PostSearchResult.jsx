import { ScrollText } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { triggerHaptic } from '../../../utils/CommonFunctions'

function PostSearchResult({ data }) {
  const navigate = useNavigate()
  function handleClick(){
    triggerHaptic('light')
    navigate(`/report/${data.id}`)
  }
  return (
    <div className="result-item" onClick={handleClick}>
        <div className="result-avatar">
            <ScrollText />
        </div>
        <div className="result-info">
            <strong className="result-title">
                    {
                        data?.title
                    }
                    <span className="result-category">
                        {
                            data?.category || ''
                        }
                    </span>
            </strong>
            <span className="result-subtitle">
                @{
                    data.user?.username
                }
            </span>
            <div className="result-meta">
                in Posts
            </div>
        </div>
    </div>
  )
}

export default PostSearchResult