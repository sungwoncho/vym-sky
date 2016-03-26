import React from 'react';

const loginButton = ({githubAuth, btnText = 'Set up vym', btnClass = 'btn btn-success btn-lg'}) => {
  function login(e) {
    e.preventDefault();
    githubAuth({scopes: [ 'public_repo' ], redirectPath: 'dashboard'});
  }

  return (
    <a href="" className={btnClass} onClick={login}>
      <i className="fa fa-github"></i>
      {btnText}
    </a>
  );
};

export default loginButton;
