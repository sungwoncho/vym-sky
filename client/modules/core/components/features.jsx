import React from 'react';

import LoginButton from '../containers/login_button';
import Footer from '../containers/footer';
import Safari from './safari.jsx';

const Features = () => (
  <div className="features-container">
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
            <span className="feature-icon octicon octicon-git-merge"></span>
            Vote and merge (In development)
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
            <span className="feature-icon octicon octicon-dashboard"></span>
            View coverage (In development)
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

    <div className="container">
      <div className="row">
        <div className="col-xs-12 cta section">
          <h2 className="heading">Why should I care?</h2>
          <div className="subheading">
            Because the current process can be improved
          </div>
          <Safari>
            <img src="images/wizard-demo.png" alt="presentation-demo" className="demo-img" />
          </Safari>

          <div className="row mt50">
            <div className="col-xs-12 col-sm-4">
              <h4>We are built to procristinate</h4>
              <p>
                Behavioral economics shows that if left on our own, we are inclined
                to procristinate and produce mediocre results. Code review in a group
                is hard to do.
              </p>

              <p>
                <h5>The Vym Way</h5>
                Invite your team members to the presentation by sharing a URL.
                Everyone has to join. Code review gets done.
              </p>
            </div>

            <div className="col-xs-12 col-sm-4">
              <h4>Pull Requests are hard to read</h4>
              <p>
                Pull requests with many changes are hard to read. Therefore, it takes
                more time and has more chance of bugs to slip in.
              </p>

              <p>
                <h5>The Vym Way</h5>
                In slides, organize the files in the order you want and add texts
                to clearly explain yourself.
              </p>
            </div>
            <div className="col-xs-12 col-sm-4">
              <h4>Sharing screen is tedious</h4>

              <p>
                You have to summon everyone to a conference room or share you
                screen to present your code.
              </p>

              <p>
                <h5>The Vym Way</h5>
                Just share a unique URL (e.g. https://vym.io/s/Wd05fO0Yt9) for the
                slide deck and start presenting.
              </p>
            </div>
          </div>
        </div>

        <div className="col-xs-12 text-xs-center login">
          <LoginButton />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default Features;
