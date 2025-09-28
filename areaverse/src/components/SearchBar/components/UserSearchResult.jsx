import { User } from 'lucide-react'
import React from 'react'

function UserSearchResult( { data }) {
  return (
    <div className="result-item">
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