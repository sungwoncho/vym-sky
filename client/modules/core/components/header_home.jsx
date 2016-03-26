import React from 'react';
import classNames from 'classnames';

import {pathFor} from '/client/modules/core/libs/helpers';
import LoginButton from '../containers/login_button';

const HomeHeader = ({currentRouteName}) => {
  function itemClassFor(itemName) {
    return classNames('nav-item', {
      active: currentRouteName === itemName
    });
  }

  return (
    <nav className="navbar navbar-light bg-faded">
      <a className="navbar-brand" href="/">Vym</a>
      <ul className="nav navbar-nav">
        <li className={itemClassFor('features')}>
          <a className="nav-link" href={pathFor('features')}>Features</a>
        </li>
        {
          // <li className={itemClassFor('pricing')}>
          //   <a className="nav-link" href="#">Pricing</a>
          // </li>
        }
        <li className="nav-item">
          <a className="nav-link" href="http://blog.vym.io" target="_blank">Blog</a>
        </li>
      </ul>
      <LoginButton btnText="Login" btnClass="btn btn-success-outline pull-xs-right" />
    </nav>
  );
};

export default HomeHeader;
