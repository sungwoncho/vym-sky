import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers.js';

const Header = ({currentUser, logout}) => {
  function onLogout(e) {
    e.preventDefault();
    logout();
  }

  function getAvatarUrl() {
    const baseUrl = 'https://avatars.githubusercontent.com';

    return `${baseUrl}/${currentUser.services.github.username}?s=300`;
  }

  return (
    <nav className="navbar navbar-slim">
      <a className="navbar-brand" href={pathFor('dashboard')}>
        vym
      </a>

      <div className="nav-item dropdown pull-xs-right">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
          <img src={getAvatarUrl()} alt="avatar" className="avatar" />
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
