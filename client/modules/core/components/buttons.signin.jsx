import React from 'react';

const signInButton = ({handleLogin}) => {
  function login(e) {
    e.preventDefault();
    handleLogin({scopes: [ 'public_repo' ], redirectPath: 'dashboard'});
  }

  return (
    <a href="" className="btn btn-success btn-lg" onClick={login}>
      <i className="fa fa-github"></i>
      Set up vym
    </a>
  );
};

export default signInButton;
