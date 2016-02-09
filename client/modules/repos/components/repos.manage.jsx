import React from 'react';

import RepoList from './repos.list.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

export default React.createClass({
  render() {
    const {repos, toggleActivatedStatus} = this.props;

    return (
      <div className="container repo-management">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <a href={pathFor('home')}>Back</a>

            <h2>Your repositories</h2>
            <RepoList repos={repos}
              managementView={true}
              toggleActivated={toggleActivatedStatus} />
            <a href="#" onClick={this.handleSyncRepos}>Sync</a>
          </div>
        </div>
      </div>
    );
  },

  handleSyncRepos(e) {
    e.preventDefault();

    this.props.syncRepos();
  }
});
