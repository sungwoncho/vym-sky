import React from 'react';

import LoginButton from '../containers/login_button';
import Footer from '../containers/footer';

import {pathFor} from '/client/modules/core/libs/helpers';

const Home = ({}) => (
  <div>
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
    <div className="demo">
      <img src="/images/demo.png" alt="demo" />
      <h2>Why?</h2>
      <ul className="list-unstyled">
        <li>Show changes in the order you want</li>
        <li>Explain yourself in the slide</li>
        <li>Share a link and present in real time</li>
      </ul>
      <a href={pathFor('features')} className="btn btn-md btn-success-outline">Learn more</a>
    </div>
    <div className="row pricing">
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

      <div className="col-xs-12 text-xs-center">
        <p className="bulk-inquiry">
          Email <a href="mailto:hey@vym.io">hey@vym.io</a> for bulk pricing for
          your GitHub organization.
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
