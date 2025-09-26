import React from 'react'

function Description({ data, next, prev, update}) {
  const charCount = data.description.length;
  const isValid   = charCount > 0 && charCount < 151 && data.title.length > 1;

  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>
          Title & Description
        </h2>
        <p>
          Provide a title and a detailed description of your report.
        </p>
      </div>
      <div className="description-wrapper">
            <div className="description-row">
              <label htmlFor="title-input">Title</label>
              <textarea
                id="title-input"
                rows="5"
                placeholder="Provide a title to your report.."
                value={data.title}
                onChange={(e) => update('title', e.target.value)}
              />
            </div>
            <div className="description-row">
              <label htmlFor="description-input">Description</label>
              <textarea
                  id="description-input"
                  rows="5"
                  placeholder="Describe the issue, query or review here..."
                  value={data.description}
                  onChange={(e) => update('description', e.target.value)}
              />
              <div className="char-counter" style={{ color: charCount > 150 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                  {charCount} / 150
              </div>
            </div>
        </div>
        <div className="form-navigation-buttons">
            <button className="btn btn-prev" onClick={prev}>Previous</button>
            <button className="btn btn-next" onClick={next} disabled={!isValid}>Next</button>
        </div>
    </div>
  )
}

export default Description