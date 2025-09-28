import React from 'react'
import Carousel from './Carousel';
function Review({ data, submit, prev }) {
  const podIcons = {
    postType: { Issue: '🚨', Query: '❓', Review: '🌟' },
    category: { Road: '🛣️', Infrastructure: '🏗️', Waste: '🗑️', Animals: '🐾' },
    severity: { Critical: '🔴', Medium: '🟠', Low: '🟢' }
  };

  return (
    <div className="form-step active">
      <div className="step-header">
        <h2>Submission Dossier</h2>
        <p>Please review your post before broadcasting.</p>
      </div>
      <div className="dossier-card">
        <Carousel images={data.images} />
        <div className="info-pods">
          {data.postType && <div className={`info-pod type-${data.postType}`}><span>{podIcons.postType[data.postType]}</span> {data.postType}</div>}
          {data.category && <div className="info-pod"><span>{podIcons.category[data.category]}</span> {data.category}</div>}
          {data.severity && <div className={`info-pod severity-pod-${data.severity}`}><span>{podIcons.severity[data.severity]}</span> {data.severity}</div>}
        </div>
        <div className="dossier-description">
          <p>{data.description || "No description provided."}</p>
        </div>
      </div>
      <div className="form-navigation-buttons">
        <button className="btn btn-prev" onClick={prev}>Edit</button>
        <button className="btn btn-next" onClick={submit}>Confirm & Submit</button>
      </div>
    </div>
  );
}

export default Review