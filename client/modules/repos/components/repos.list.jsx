import React from 'react';

import RepoItem from './repos.item.jsx';

export default React.createClass({
  render() {
    return (
      <ul>
        {this.renderRepoList()}
      </ul>
    );
  },

  renderRepoList() {
    const {repos} = this.props;

    return repos.map(function (repo) {
      return <RepoItem repo={repo} key={repo._id} />;
    });
  }
});
