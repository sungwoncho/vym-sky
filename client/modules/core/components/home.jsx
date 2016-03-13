import React from 'react';
import classNames from 'classnames';

import SlideDeckList from './slide_deck_list.jsx';
import RepoList from './repo_list.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentTab: 'slides'};
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabName) {
    this.setState({currentTab: tabName});
  }

  render() {
    let {slideDecks, repos} = this.props;

    return (
      <div className="container home">
        <div className="row">
          <div className="col-xs-12">
            <Nav currentTab={this.state.currentTab}
              handleChangeTab={this.changeTab} />

            {
              this.state.currentTab === 'slides' ?
                <SlideDeckList slideDecks={slideDecks} />
              :
                <RepoList repos={repos} />
            }
          </div>
        </div>
      </div>
    );
  }
}


const Nav = ({currentTab, handleChangeTab}) => {
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
        <li className="nav-item">
          <a className={getTabClass('slides')} onClick={onChangeTab.bind(this, 'slides')} href="#">Slides</a>
        </li>
        <li className="nav-item">
          <a className={getTabClass('repos')} onClick={onChangeTab.bind(this, 'repos')} href="#">Repos</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
