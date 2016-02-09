import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

export default React.createClass({
  render() {
    const {repo} = this.props;

    return (
      <li className="repo-item">
        <a href={pathFor('repo', {ownerName: repo.owner.name, repoName: repo.name})}
          className="repo-item-link">
          <div>
            {repo.owner.name} / {repo.name}
          </div>
          <p className="repo-item-description">
            {repo.description}
          </p>
        </a>
      </li>
    );
  }
});
