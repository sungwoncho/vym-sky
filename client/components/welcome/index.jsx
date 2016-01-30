import React from 'react';
import SignInButton from '../buttons.signin/index.jsx';

export default React.createClass({
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Turn your pull request into a presentation</h1>
            <SignInButton />
          </div>
        </div>
      </div>
    );
  }
});
