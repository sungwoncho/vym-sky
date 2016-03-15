import React from 'react';

import Nav from './nav.jsx';
import SlidesTab from './slides_tab.jsx';
import CollaboratorList from '../containers/collaborator_list';
import {pathFor} from '/client/modules/core/libs/helpers';

let tabMapping = {
  'slides': SlidesTab,
  'collaborators': CollaboratorList,
};

class Repo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentTab: 'slides'};
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tabName) {
    this.setState({currentTab: tabName});
  }

  render() {
    let {repo, slideDecks} = this.props;
    let CurrentTab = tabMapping[this.state.currentTab];
    let availableTabs = [ 'slides', 'collaborators' ];

    return (
      <div className="container repo">
        <div className="row">
          <div className="col-xs-12">
            <div className="info-container">
              <div className="info">
                <div className="repo-name pull-sm-left">
                  <a href={pathFor('repo', {repoName: repo.name, ownerName: repo.owner.name})}>
                    {repo.getFullName()}
                  </a>
                </div>
              </div>
            </div>

            <Nav tabNames={availableTabs}
              currentTab={this.state.currentTab}
              handleChangeTab={this.changeTab} />

            <CurrentTab slideDecks={slideDecks}
              repo={repo} />
          </div>
        </div>
      </div>
    );
  }
}

export default Repo;
