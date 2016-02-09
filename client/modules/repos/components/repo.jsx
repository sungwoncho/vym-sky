import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

export default React.createClass({
  render() {
    const {repo} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>
              {repo.name}
            </h2>

            <a href={pathFor('decks.new', {ownerName: repo.owner.name, repoName: repo.name})}
              className="btn btn-md btn-success">
              Create new deck
            </a>
          </div>
        </div>
      </div>
    );
  }
});
