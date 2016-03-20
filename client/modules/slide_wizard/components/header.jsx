import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

const Header = ({repo, slideDeck}) => {
  let repoLink = pathFor('repo', {
    ownerName: slideDeck.repo.ownerName, repoName: slideDeck.repo.name
  });

  return (
    <div className="wz-header">
      <div className="wz-branding-container">
        <a href={repoLink}>
          <div className="wz-branding">
            <i className="fa fa-angle-double-left"></i>
          </div>
        </a>
      </div>
      <div className="wz-meta">
        <div className="wz-slide-title">
          {slideDeck.title}
        </div>
        <div>
          #{slideDeck.prNumber}
        </div>
      </div>
      <div className="wz-actions">
        <a href="#" className="btn btn-sm btn-secondary">Share</a>
        <a href="#" className="btn btn-sm btn-secondary">
          <i className="fa fa-play"></i>
          Present
        </a>
      </div>
    </div>
  );
};

export default Header;
