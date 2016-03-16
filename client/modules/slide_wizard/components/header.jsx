import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

const Header = ({repo, slideDeck, currentSlideNumber}) => (
  <nav className="navbar navbar-full navbar-dark navbar-wizard">
    <a className="navbar-brand" href={pathFor('dashboard')}>
      vym
    </a>

    <div className="nav navbar-nav pull-xs-right top-actions">
      <a href={pathFor('repo', {ownerName: slideDeck.repo.ownerName, repoName: slideDeck.repo.name})} className="nav-item nav-link">
        Back to repo
      </a>
    </div>
  </nav>
);

export default Header;
