import React from 'react';

import RepoList from './repos.list.jsx';

export default React.createClass({
  render() {
    const {repos} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <RepoList repos={repos} managementView={true} />
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
