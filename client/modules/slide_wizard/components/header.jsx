import React from 'react';
import moment from 'moment';

import ShareBtn from './share_btn.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

const Header = ({repo, slideDeck, pullRequest}) => {
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
          {pullRequest ?
            <div className="wz-pr-title">
              {pullRequest.title} <a href={pullRequest.html_url} target="_blank">
              <i className="fa fa-github"></i>
            </a>
            </div> :
            ''
          }
          <small className="text-muted wz-last-saved-at">
            Last saved at {moment(slideDeck.updatedAt).format('MMM DD hh:mm')}
          </small>
        </div>
      </div>
      <div className="wz-actions">
        <ShareBtn slideDeckUid={slideDeck.uid} />
        <a href={pathFor('slide_deck', {slideDeckUid: slideDeck.uid})}
          className="btn btn-sm btn-secondary">
          <i className="fa fa-play"></i>
          Present
        </a>
      </div>
    </div>
  );
};

export default Header;
