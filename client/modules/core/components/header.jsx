import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers.js';

const Header = ({currentUser, logout}) => {
  function getRootPath() {
    if (currentUser) {
      return '/home';
    } else {
      return '/';
    }
  }

  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <a className="navbar-brand" href={getRootPath()}>
          vym
        </a>

        <Menus currentUser={currentUser}
          logout={logout} />
      </div>
    </nav>
  );
};


const Menus = ({currentUser, logout}) => {
  if (currentUser) {
    return (
      <UserActions currentUser={currentUser}
                   handleLogout={logout} />
    );
  } else {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a className="nav-link" href="http://blog.vym.io">
            Blog
          </a>
        </li>
      </ul>
    );
  }
};

const UserActions = ({currentUser, handleLogout}) => {
  function onLogout(e) {
    e.preventDefault();
    handleLogout();
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <div className="nav-item dropdown">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
          {currentUser.profile.name}
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href={pathFor('settings')}>
            Settings
          </a>
          <a className="dropdown-item" href="#" onClick={onLogout}>
            Logout
          </a>
        </div>
      </div>
    </ul>
  );
};

export default Header;
