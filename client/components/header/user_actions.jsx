import React from 'react';

export default React.createClass({
  logout() {
    Meteor.logout(function (err) {
      if (err) {
        return console.log(err);
      }

      FlowRouter.go('main');
    });
  },

  render() {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
            {this.props.currentUser.profile.name}
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#" onClick={this.logout}>
              Logout
            </a>
          </div>
        </div>
      </ul>
    );
  }
});
