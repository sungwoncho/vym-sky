import React from 'react';

export default React.createClass({
  render() {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
            <img src={this.getGithubAvatarUrl()}
              alt="profile-picture"
              className="profile-picture" />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" onClick={this.logout}>
              Logout
            </a>
          </div>
        </div>
      </ul>
    );
  },

  getGithubAvatarUrl() {
    const {user} = this.props;
    const baseUrl = 'https://avatars.githubusercontent.com';

    return `${baseUrl}/${user.services.github.username}?s=200`;
  }
});
