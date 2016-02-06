import React from 'react';
import SignInButton from '../buttons.signin/index.jsx';

export default React.createClass({
  render() {
    return (
      <div className="main-hero">
        <h1>
          Turn your pull request into a presentation
        </h1>
        <SignInButton />
      </div>
    );
  }
});
