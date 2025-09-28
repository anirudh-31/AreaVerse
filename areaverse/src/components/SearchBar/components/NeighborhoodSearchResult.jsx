import { MapPin } from 'lucide-react'
import React from 'react'

function NeighborhoodSearchResult({ data }) {
  return (
    <div className="result-item">
      <div className="result-avatar">
        <MapPin/>
      </div>
      <div className="result-info">
        <strong className="result-title">
          {
            data.name
          }
        </strong>
        <span className="result-subtitle">
          {
            data.city
          }, 
          {
            " ".concat(data.state)
          }
        </span>
        <div className="result-meta">
          in Neighborhoods
        </div>
      </div>
    </div>
  )
}

export default NeighborhoodSearchResult