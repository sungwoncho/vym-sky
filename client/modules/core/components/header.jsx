import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers.js';

const Header = ({currentUser, logout, login}) => {
  function getRootPath() {
    if (currentUser) {
      return '/home';
    } else {
      return '/';
    }
  }

  function onLogout(e) {
    e.preventDefault();
    handleLogout();
  }

  function onLogin(e) {
    e.preventDefault();
    handleLogin();
  }

  function getAvatarUrl() {
    const baseUrl = 'https://avatars.githubusercontent.com';

    return `${baseUrl}/${currentUser.services.github.username}?s=300`;
  }

  return (
    <nav className="navbar">
      <a className="navbar-brand" href={getRootPath()}>
        vym
      </a>

      <div className="nav-item dropdown pull-sm-right">
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

// const UserActions = ({currentUser, handleLogout, handleLogin}) => {
//   function onLogout(e) {
//     e.preventDefault();
//     handleLogout();
//   }
//
//   function onLogin(e) {
//     e.preventDefault();
//     handleLogin();
//   }
//
//   return (
//     <ul className="nav navbar-nav pull-xs-right">
//       {
//         currentUser ?
//           <div className="nav-item dropdown">
//             <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
//               {currentUser.profile.name}
//             </a>
//             <div className="dropdown-menu">
//               <a className="dropdown-item" href={pathFor('settings')}>
//                 Settings
//               </a>
//               <a className="dropdown-item" href="#" onClick={onLogout}>
//                 Logout
//               </a>
//             </div>
//           </div>
//         :
//           <ul className="nav navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link" href="#" onClick={onLogin}>
//                 Login
//               </a>
//             </li>
//           </ul>
//       }
//     </ul>
//   );
// };

export default Header;
