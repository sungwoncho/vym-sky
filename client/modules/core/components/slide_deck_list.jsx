import React from 'react';

import {pathFor} from '/client/modules/core/libs/helpers';


const SlideDeckList = ({slideDecks}) => (
  <ul className="list-unstyled row">
    {
      slideDecks.map(function (sd) {
        return <SlideDeckItem slideDeck={sd} />;
      })
    }
  </ul>
);

const SlideDeckItem = ({slideDeck}) => (
  <li className="col-sm-3">
    <div className="sd-card">
      <div className="sd-card-body">
        <div className="info">
          <div className="sd-name">{slideDeck.uid}</div>
          <div className="sd-repo-name">
            {slideDeck.getFullRepoName()}
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-sm btn-secondary" href={pathFor('slide_deck', {slideDeckUid: slideDeck.uid})} >View</a>
        </div>
      </div>
    </div>
  </li>
);

export default SlideDeckList;
