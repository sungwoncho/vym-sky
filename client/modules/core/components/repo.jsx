import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';

export default React.createClass({
  render() {
    const {repo, slideDecks} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>
              {repo.name}
            </h2>

            <a href={pathFor('new_deck', {ownerName: repo.owner.name, repoName: repo.name})}
              className="btn btn-md btn-success">
              Create new deck
            </a>
          </div>
          <SlideDeckList slideDecks={slideDecks} />
        </div>
      </div>
    );
  }
});

const SlideDeckList = ({slideDecks}) => (
  <ul>
    {
      slideDecks.map(function(sd) {
        return <li>
          {sd.uid}
          <a href={pathFor('slide_deck.wizard', {slideDeckUid: sd.uid})}>Edit</a>
          <a href={pathFor('slide_deck', {slideDeckUid: sd.uid})}>View</a>
        </li>;
      })
    }
  </ul>
);
