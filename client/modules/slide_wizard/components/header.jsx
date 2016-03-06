import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

const Header = ({currentUser, wizardActions, slideDeck, currentSlideNumber}) => (
  <nav className="navbar navbar-full navbar-dark navbar-wizard">
    <a className="navbar-brand" href={pathFor('home')}>
      vym
    </a>

    <div className="nav navbar-nav pull-xs-right top-actions">
      <a href="#" className="nav-item nav-link">
        Share
      </a>
    </div>
  </nav>
);

export default Header;
