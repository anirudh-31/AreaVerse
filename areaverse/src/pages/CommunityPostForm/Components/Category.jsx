import React from 'react'

function Category( { data, update, next, prev }) {
  const options = [
        { value: 'Road'          , icon: '🛣️' },
        { value: 'Infrastructure', icon: '🏗️' },
        { value: 'Waste'         , icon: '🗑️' },
        { value: 'Animals'       , icon: '🐾' }
    ];
  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>Select Category</h2>
        <p>This helps group reports together.</p>
      </div>
       <div className="selection-grid">
          {options.map(opt => (
              <div
                  key={opt.value}
                  className={`selection-card ${data.category === opt.value ? 'selected' : ''}`}
                  onClick={() => update('category', opt.value)}
              >
                  <div className="icon">{opt.icon}</div>
                  <div className="card-text">{opt.value}</div>
                  <div className="card-icon">{data.category === opt.value ? '✓' : '+'}</div>
              </div>
          ))}
      </div>
      <div className="form-navigation-buttons">
          <button className="btn btn-prev" onClick={prev}>Previous</button>
          <button className="btn btn-next" onClick={next} disabled={!data.category}>Next</button>
      </div>
    </div>
  )
}

export default Category