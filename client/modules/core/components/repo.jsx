import React from 'react';

import SlideDeckList from './slide_deck_list.jsx';
import {pathFor} from '/client/modules/core/libs/helpers';

const Repo = ({repo, slideDecks}) => (
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

        <SlideDeckList slideDecks={slideDecks} />
      </div>
    </div>
  </div>
);

export default Repo;
