import React from 'react';

import RepoItem from './repos.item.jsx';
import RepoManageItem from './repos.manage.item.jsx';

export default React.createClass({
  render() {
    return (
      <ul className="list-unstyled">
        {this.renderRepoList()}
      </ul>
    );
  },

  renderRepoList() {
    const {repos, toggleActivated, managementView} = this.props;

    return repos.map(function (repo) {
      if (managementView) {
        return (
          <RepoManageItem repo={repo}
            key={repo._id}
            toggleActivated={toggleActivated} />
        );
      } else {
        return (
          <RepoItem repo={repo}
            key={repo._id} />
        );
      }
    });
  }
});
