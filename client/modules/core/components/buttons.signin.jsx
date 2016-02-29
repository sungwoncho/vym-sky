import React from 'react';

const signInButton = React.createClass({
  login() {
    this.props.handleLogin();
  },

  render() {
    return (
      <a href="" className="btn btn-success btn-lg" onClick={this.login}>
        <i className="fa fa-github"></i>
        Set up vym
      </a>
    );
  }
});

export default signInButton;
