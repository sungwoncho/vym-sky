import React from 'react';

import Nav from './nav.jsx';
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
    let availableTabs = ['slides', 'repos'];

    return (
      <div className="container home">
        <div className="row">
          <div className="col-xs-12">
            <Nav tabNames={availableTabs}
              currentTab={this.state.currentTab}
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

export default Home;
