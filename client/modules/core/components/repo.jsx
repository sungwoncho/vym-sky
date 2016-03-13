import React from 'react';

import Nav from './nav.jsx';
import SlideDeckList from '../containers/slide_deck_list';
import CollaboratorList from '../containers/collaborator_list';
import {pathFor} from '/client/modules/core/libs/helpers';

let tabMapping = {
  'slides': SlideDeckList,
  'collaborators': CollaboratorList
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
    let availableTabs = ['slides', 'newSlides', 'collaborators'];

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>
              {repo.name}
            </h2>

            <Nav tabNames={availableTabs}
              currentTab={this.state.currentTab}
              handleChangeTab={this.changeTab} />

            <a href={pathFor('new_deck', {ownerName: repo.owner.name, repoName: repo.name})}
              className="btn btn-md btn-success">
              Create new deck
            </a>

            <CurrentTab slideDecks={slideDecks}
              repo={repo} />
          </div>
        </div>
      </div>
    );
  }
}

export default Repo;
