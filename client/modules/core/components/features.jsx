import React from 'react';

const Features = () => (
  <div>
    <div className="hero">
      <h2 className="heading">Review code better</h2>
      <div className="sub-heading text-muted">Get across your idea fast and efficiently</div>
    </div>
    <div className="container features">
      <div className="row">
        <div className="col-xs-12 col-lg-4 feature">
          <div className="feature-heading">
            <i className="feature-icon fa fa-clock-o"></i> Real time
          </div>
          <p className="feature-desc">
            Share a unique URL to your slide deck and present it real time over
            the browser. No need to share screen.
          </p>
        </div>
        <div className="col-xs-12 col-lg-4 feature">
          <div className="feature-heading">
            <i className="feature-icon fa fa-scissors"></i> Organize
          </div>
          <p className="feature-desc">
            Use our slide wizard to organize your changes. No more giant walls of
            code in Pull Requests.
          </p>
        </div>
        <div className="col-xs-12 col-lg-4 feature upcoming">
          <div className="feature-heading">
            <span className="feature-icon octicon octicon-git-merge"></span> Vote and merge (In development)
          </div>
          <p className="feature-desc">
            At the end of the presentation, cast a vote and merge automatically.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-lg-4 feature">
          <div className="feature-heading">
            <i className="feature-icon fa fa-github"></i> GitHub integration
          </div>
          <p className="feature-desc">
            Just login with GitHub and work with your data.
          </p>
        </div>
        <div className="col-xs-12 col-lg-4 feature upcoming">
          <div className="feature-heading">
            <span className="feature-icon octicon octicon-dashboard"></span> View coverage (In development)
          </div>
          <p className="feature-desc">
            See how much of the Pull Request is covered by the slide. You can be
            confident that you understand the Pull Request after following it.
          </p>
        </div>
        <div className="col-xs-12 col-lg-4 feature">
          <div className="feature-heading">
            <span className="feature-icon octicon octicon-lock"></span> Your code is safe
          </div>
          <p className="feature-desc">
            We never save your code except slides. Only your team can access
            the slides.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
