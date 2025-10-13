import { User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserSearchResult( { data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${data?.id}`)
  }
  return (
    <div className="result-item" onClick={handleClick}>
      <div className="result-avatar">
        <User />
      </div>
      <div className="result-info">
        <strong className="result-title">
          {
            data.first_name
          } 
          {
           ' '.concat(data.last_name || '')
          }
        </strong>
        <span className="result-subtitle">
          @{
            data.username
          }
        </span>
        <div className="result-meta">
          in Users
        </div>
      </div>
    </div>
  )
}

export default UserSearchResult