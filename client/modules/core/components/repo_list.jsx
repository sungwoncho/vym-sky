import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

const RepoList = ({repos}) => (
  <div className="repo-list-container">
    <ul className="list-unstyled repo-list">
      {
        repos.map(function (repo) {
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
        <i className="fa fa-book"></i>
        <div className="repo-name">
          {repo.owner.name} / {repo.name}
        </div>
      </div>
    </a>
  </li>
);

export default RepoList;
