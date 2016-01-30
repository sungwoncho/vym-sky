import React from 'react';

export default React.createClass({
  login() {
    Meteor.loginWithGithub({
      requestPermissions: ['public_repo']
    }, function (err) {
      if (err) {
        return console.log(err);
      }

      FlowRouter.go('home');
    });
  },

  render() {
    return (
      <a href="" className="btn btn-success" onClick={this.login}>
        Sign in with github
      </a>
    );
  }
});
