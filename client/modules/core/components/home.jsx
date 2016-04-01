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
      <div className="col-xs-12 col-sm-3 col-sm-offset-3 plan">
        <h2>Open source</h2>
        <div>
          <div className="price">$0</div>
          <div className="frequency">/ month</div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-3 plan">
        <h2>Private repo</h2>
        <div>
          <div className="price">$12</div>
          <div className="frequency">/ month</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
