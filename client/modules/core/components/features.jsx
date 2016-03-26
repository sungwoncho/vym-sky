import React from 'react';

const Features = () => (
  <div className="container feature">
    <div className="row">
      <div className="hero col-xs-12">
        <h2>Do better code reivew</h2>
        <small>Get across your idea fast and efficiently</small>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-lg-4">
        <h3>
          <i className="fa fa-clock-o"></i> Real time
        </h3>
        <p>
          Share a unique URL to your slide deck and present it real time over
          the browser. No need to share screen.
        </p>
      </div>
      <div className="col-xs-12 col-lg-4">
        <h3>
          <i className="fa fa-scissors"></i> Organize
        </h3>
        <p>
          Use our slide wizard to organize your changes. No more giant walls of
          code in Pull Requests.
        </p>
      </div>
      <div className="col-xs-12 col-lg-4">
        <h3>
          <span className="octicon octicon-git-merge"></span> Vote and merge
        </h3>
        <p>
          At the end of the presentation, cast a vote and merge automatically.
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-lg-4">
        <h3>
          <i className="fa fa-github"></i> GitHub integration
        </h3>
        <p>
          Just login with GitHub and work with your data.
        </p>
      </div>
      <div className="col-xs-12 col-lg-4">
        <h3>
          <span className="octicon octicon-dashboard"></span> View coverage
        </h3>
        <p>
          See how much of the Pull Request is covered by the slide. You can be
          confident that you understand the Pull Request after following it.
        </p>
      </div>
      <div className="col-xs-12 col-lg-4">
        <h3>
          <span className="octicon octicon-lock"></span> Your code is safe
        </h3>
        <p>
          We never save your code except slides. Only your team can access
          the slides.
        </p>
      </div>
    </div>
  </div>
);

export default Features;
