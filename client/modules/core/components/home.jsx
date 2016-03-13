import React from 'react';
import classNames from 'classnames';

import SlideDeckList from './slide_deck_list.jsx';
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
    let {slideDecks} = this.props;

    return (
      <div className="container home">
        <div className="row">
          <div className="col-sm-12">
            <Nav currentTab={this.state.currentTab}
              handleChangeTab={this.changeTab} />

            {
              this.state.currentTab === 'slides' ?
                <SlideDeckList slideDecks={slideDecks} />
              :
                <span></span>
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

// const ProfileInfo = ({user}) => {
  // function getAvatarUrl() {
  //   const baseUrl = 'https://avatars.githubusercontent.com';
  //
  //   return `${baseUrl}/${user.services.github.username}?s=300`;
  // }
//
//   return (
//     <div>
//       <img src={getAvatarUrl()} alt="github-avatar"
//         className="github-avatar" />
//       <h4>{user.profile.name}</h4>
//       <h5 className="text-muted">{user.services.github.username}</h5>
//     </div>
//   );
// };

export default Home;
