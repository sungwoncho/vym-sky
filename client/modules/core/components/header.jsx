import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers.js';
import {getAvatarUrl} from '/client/modules/core/libs/helpers.js';

const Header = ({currentUser, logout}) => {
  let avatarUrl = getAvatarUrl({githubHandle: currentUser.services.github.username});

  function onLogout(e) {
    e.preventDefault();
    logout();
  }

  return (
    <nav className="navbar navbar-slim">
      <a className="navbar-brand" href={pathFor('dashboard')}>
        vym
      </a>

      <div className="nav-item dropdown pull-xs-right">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
          <img src={avatarUrl} alt="avatar" className="avatar" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href={pathFor('settings')}>
            Settings
          </a>
          <a className="dropdown-item" href="#" onClick={onLogout}>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
