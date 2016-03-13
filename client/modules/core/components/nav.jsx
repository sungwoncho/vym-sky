import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const Nav = ({tabNames, currentTab, handleChangeTab}) => {
  function getTabClass(tabName) {
    return classNames('nav-link', {'active': currentTab === tabName});
  }

  function onChangeTab(tabName, e) {
    e.preventDefault();
    handleChangeTab(tabName);
  }

  return  (
    <div className="nav-center">
      <ul className="nav nav-tabs">
        {
          tabNames.map(function (tabName, index) {
            return (
              <li className="nav-item" key={index}>
                <a className={getTabClass(tabName)}
                  onClick={onChangeTab.bind(this, tabName)}
                  href="#">{_.capitalize(tabName)}</a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Nav;
