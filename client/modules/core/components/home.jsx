import React from 'react';

import LoginButton from '../containers/login_button';
import Footer from '../containers/footer';
import Safari from './safari.jsx';

import {pathFor} from '/client/modules/core/libs/helpers';

const Home = ({}) => (
  <div className="home">
    <div className="main-hero">
      <div className="diagram-summary">
        <span className="octicon octicon-git-pull-request"></span>
        <span className="octicon octicon-arrow-right"></span>
        <span className="octicon octicon-browser"></span>
      </div>
      <h1>
        Turn your pull requests into slide decks
      </h1>
      <LoginButton />
    </div>

    <div className="container-fluid">
      <div className="row workflow section">
        <div className="col-sm-12">
          <h2 className="heading">The Vym workflow</h2>

          <div className="workflow-item">
            <div className="workflow-icon">
              <i className="fa fa-code"></i>
            </div>
            <div className="workflow-name">
              1. Code
            </div>
          </div>

          <div className="workflow-item">
            <div className="workflow-icon">
              <span className="octicon octicon-git-pull-request"></span>
            </div>
            <div className="workflow-name">
              2. Pull Request
            </div>
          </div>

          <div className="workflow-item vym-specific">
            <div className="workflow-icon">
              <i className="fa fa-th-large"></i>
            </div>
            <div className="workflow-name">
              3. Create slide deck
            </div>
          </div>

          <div className="workflow-item vym-specific">
            <div className="workflow-icon">
              <span className="octicon octicon-browser"></span>
            </div>
            <div className="workflow-name">
              4. Present real time
            </div>
          </div>

          <div className="workflow-item">
            <div className="workflow-icon">
              <span className="octicon octicon-git-merge"></span>
            </div>
            <div className="workflow-name">
              5. Merge
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row demo section">
        <div className="col-xs-12">
          <h2 className="big-title">
            Create slide deck
          </h2>

          <div className="subheading">
            Easily create a slide deck from your PR using the wizard
          </div>

          <Safari>
            <img src="images/wizard-demo.png" alt="" />
          </Safari>
        </div>

        <div className="col-xs-12 text-xs-center mt20">
          <a href={pathFor('features')} className="btn btn-lg btn-success-outline">Learn more</a>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row demo section">
        <div className="col-xs-12">
          <h2 className="big-title">
            Present real time
          </h2>

          <div className="subheading">
            Share a URL with your team and just start real time code review
          </div>

          <Safari>
            <img src="images/presentation-demo.png" alt="" />
          </Safari>
        </div>

        <div className="col-xs-12 text-xs-center mt20">
          <a href={pathFor('features')} className="btn btn-lg btn-success-outline">Learn more</a>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row pricing section">
        <div className="col-xs-12 text-xs-center pricing-title">
          <h2>Pricing</h2>
        </div>

        <div className="col-xs-12 col-sm-8 col-sm-offset-2">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="plan">
                <div className="plan-name">Open source</div>
                <div className="price">Free</div>
                <ul className="offer list-unstyled">
                  <li>
                    <span className="quantity">Unlimited</span> slide decks
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="plan">
                <div className="plan-name">Private Repo - Lite</div>
                <div className="price">Free</div>
                <ul className="offer list-unstyled">
                  <li></li>
                  <span className="quantity">10</span> slide decks per month
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="plan">
                <div className="plan-name">Private Repo - Pro</div>
                <div>
                  <div className="price">$12</div>
                  <div className="frequency">/ month</div>
                </div>
                <ul className="offer list-unstyled">
                  <li></li>
                  <span className="quantity">Unlimited</span> slide decks
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xs-12 text-xs-center mt20">
          <LoginButton />
        </div>

        <div className="col-xs-12 text-xs-center">
          <p className="bulk-inquiry">
            Email <a href="mailto:hey@vym.io">hey@vym.io</a> for bulk pricing for
            your GitHub organization.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
