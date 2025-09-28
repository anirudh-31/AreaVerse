import React from 'react'

function Severity({data, update, prev, next}) {
  const options = [
        { value: 'Low'     , icon: '🟢' },
        { value: 'Medium'  , icon: '🟠' },
        { value: 'Critical', icon: '🔴' }
    ];
  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>Issue Severity</h2>
        <p>How critical is this issue?</p>
      </div>
      <div className="selection-grid">
        {
          options.map(opt =>  (
                    <div
                        key={opt.value}
                        className={`selection-card ${data.severity === opt.value ? 'selected' : ''}`}
                        onClick={() => update('severity', opt.value)}
                      >
                        <div className="icon">{opt.icon}</div>
                        <div className="card-text">{opt.value}</div>
                        <div className="card-icon">{data.severity === opt.value ? '✓' : '+'}</div>
                    </div>
            )
          )
        }
      </div>
      <div className="form-navigation-buttons">
          <button className="btn btn-prev" onClick={prev}>Previous</button>
          <button className="btn btn-next" onClick={next} disabled={!data.severity}>Next</button>
      </div>
    </div>
  )
}

export default Severity