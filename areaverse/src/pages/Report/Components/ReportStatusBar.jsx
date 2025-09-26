import React, { useState } from 'react'
import { formatToISTTimeStamp, timeAgo } from '../../../utils/CommonFunctions';
import { CheckIcon, ChevronRightIcon, SearchIcon, ThumbsDownIcon, ThumbsUpIcon,  Plus } from 'lucide-react';

function ReportStatusBar({ history }) {

    const STATUS_CONFIG = {
    'REPORTED'        : { icon: <CheckIcon />     , color: 'var(--color-success)', actionActor: 'USER' , actionText: ' submitted the report.'      , actionColor: 'var(--color-primary)'    },
    'UNDER_REVIEW'    : { icon: <SearchIcon />    , color: 'var(--color-info)'   , actionActor: 'ADMIN', actionText: ' started reviewing.'         , actionColor: 'var(--color-primary-alt)'},
    'MORE_INFO_NEEDED': { icon: <Plus />          , color: 'var(--color-warning)', actionActor: 'ADMIN', actionText: ' requested more information.', actionColor: 'var(--color-primary-alt)'},
    'APPROVED'        : { icon: <ThumbsUpIcon />  , color: 'var(--color-success)', actionActor: 'ADMIN', actionText: ' rejected the report.'       , actionColor: 'var(--color-primary-alt)'},
    'REJECTED'        : { icon: <ThumbsDownIcon />, color: 'var(--color-error)'  , actionActor: 'ADMIN', actionText: ' approved the report.'       , actionColor: 'var(--color-primary-alt)'},
};
    const [isOpen, setIsOpen] = useState(false);

    if (!history || history.length === 0) return null;

    const currentStatusEntry = history[history.length - 1];
    const currentConfig = STATUS_CONFIG[currentStatusEntry.status] || {};
  return (
      <div className="collapsible-tracker">
          <div className="status-header" onClick={() => setIsOpen(!isOpen)}>
              <div className="current-status">
                  <div className="status-icon" style={{ backgroundColor: currentConfig.color }}>
                      {currentConfig.icon}
                  </div>
                  <span className="current-status-text" style={{ color: currentConfig.color }}>
                      Status: {currentStatusEntry.status.replace(/_/g, ' ')}
                  </span>
              </div>
              <div className={`toggle-chevron ${isOpen ? 'open' : ''}`}><ChevronRightIcon /></div>
          </div>
          <div className={`status-tracker-collapsible ${isOpen ? 'open' : ''}`}>
              <ol className="activity-log">
                  {history.map((item, index) => {
                      const config = STATUS_CONFIG[item.status] || {};
                      return (
                          <li key={index} className="log-item" style={{ animationDelay: `${index * 100}ms` }}>
                              <span className="timeline-avatar"  style={{ backgroundColor: config.actionColor }}>
                                {config.actionActor.charAt(0).toUpperCase()}
                              </span>
                              <div className="timeline-avatar-icon" style={{ backgroundColor: config.color }}>
                                  {config.icon}
                              </div>
                              <div className="timeline-content">
                                  <p className="log-title">{config.actionActor} <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>{config['actionText']}</span></p>
                                  <p className="log-timestamp">{formatToISTTimeStamp(item.createdAt)}</p>
                                  {item.message && (
                                      <div className="timeline-details">
                                          <p>{item.message}</p>
                                      </div>
                                  )}
                              </div>
                          </li>
                      );
                  })}
              </ol>
          </div>
      </div>
  )
}

export default ReportStatusBar