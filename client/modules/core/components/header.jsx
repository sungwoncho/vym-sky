import React from 'react';
import UserActions from './header.user_actions.jsx';

let Header =  React.createClass({
  renderMenus() {
    if (this.props.currentUser) {
      return (
        <UserActions currentUser={this.props.currentUser}
                     handleLogout={this.props.logout} />
      );
    } else {
      return (
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link" href="http://blog.coddee.io">
              Blog
            </a>
          </li>
        </ul>
      );
    }
  },

  getRootPath() {
    if (this.props.currentUser) {
      return '/home';
    } else {
      return '/';
    }
  },

  render() {
    return (
      <nav className="navbar navbar-dark">
        <div className="container">
          <a className="navbar-brand" href={this.getRootPath()}>
            Coddee
          </a>

          {this.renderMenus()}
        </div>
      </nav>
    );
  }
});

export default Header;
