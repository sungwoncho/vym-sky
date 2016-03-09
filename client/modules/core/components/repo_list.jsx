import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

const RepoList = ({repos}) => (
  <div className="repo-list-container">
    <div className="repo-list-header">
      Repositories
      <a href={pathFor('settings.repo')} className="pull-xs-right">
        <i className="fa fa-cog"></i>
      </a>
    </div>
    <ul className="list-unstyled repo-list">
      {
        repos.map(function(repo) {
          return <RepoItem repo={repo}
                    key={repo._id} />;
        })
      }
    </ul>
  </div>
);

const RepoItem = ({repo}) => (
  <li className="repo-item">
    <a href={pathFor('repo', {ownerName: repo.owner.name, repoName: repo.name})}
      className="repo-item-link">
      <div>
        {repo.owner.name} / {repo.name}
      </div>
    </a>
  </li>
);

export default RepoList;
