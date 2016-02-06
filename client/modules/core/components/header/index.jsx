import React from 'react';
import UserActions from './user_actions.jsx';

let Header =  React.createClass({
  renderUserActions() {
    if (this.props.currentUser) {
      return (
        <UserActions currentUser={this.props.currentUser} />
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
      <nav className="navbar navbar-dark bg-inverse">
        <a className="navbar-brand" href={this.getRootPath()}>Coddee</a>
        {this.renderUserActions()}
      </nav>
    );
  }
});

export default Header;
