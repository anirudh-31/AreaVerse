import { Check, Plus } from 'lucide-react'
import React from 'react'

function PostType({ data, update, next }) {
  const options = [
    { value: 'Issue' , icon: '🚨', text: 'Raise an Issue'    },
    { value: 'Query' , icon: '❓', text: 'Ask a Query'       },
    { value: 'Review', icon: '🌟', text: 'Share Good Things' }
  ]
  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>Create a report</h2>
        <p>What kind of report would you like to make?</p>
      </div>
      <div className="selection-grid">
        {
          options.map((option) => {
            return (<div
                key={option.value}
                className={`selection-card ${data.postType === option.value ? 'selected' : ''}`}
                onClick={() => update('postType', option.value)}
            >
                <div className="icon">{option.icon}</div>
                <div className="card-text">{option.text}</div>
                <div className="card-icon">{data.postType === option.value ? <Check /> : <Plus />}</div>
            </div>)
          })
        }
      </div>
      <div className="form-navigation-buttons">
        <span></span>
        <button className="btn btn-next" onClick={next} disabled={!data.postType}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PostType