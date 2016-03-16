import React from 'react';
import classNames from 'classnames';
import {humanize} from 'underscore.string';

const Nav = ({tabs, currentTabName}) => {
  function getTabClass(tabName) {
    return classNames('nav-link', {active: currentTabName === tabName});
  }

  return (
    <div className="nav-center">
      <ul className="nav nav-tabs">
        {
          tabs.map(function (tab, index) {
            return (
              <li className="nav-item" key={index}>
                <a className={getTabClass(tab.name)}
                  href={tab.href}>{humanize(tab.name)}</a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Nav;
