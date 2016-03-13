import React from 'react';
import moment from 'moment';

import {pathFor} from '/client/modules/core/libs/helpers';


const SlideDeckList = ({slideDecks, repo}) => (
  <ul className="list-unstyled row">
    {
      slideDecks.map(function (sd) {
        return <SlideDeckItem slideDeck={sd}
          key={sd.uid} />;
      })
    }
  </ul>
);

const NewSlideDeckBtn = ({repo, onShowSlideDeckForm}) => {
  function handleShowSlideDeckForm() {
    if (repo) {
      onShowSlideDeckForm(repo.owner.name, repo.name);
    } else {
      onShowSlideDeckForm();
    }
  }

  return (
    <li className="col-lg-4 col-md-6 col-xs-12 sd-card-container">
      <button href="#" className="sd-card new-sd-btn" onClick={handleShowSlideDeckForm}>
        <i className="fa fa-plus fa-2x"></i>
      </button>
    </li>
  );
}


const SlideDeckItem = ({slideDeck}) => (
  <li className="col-lg-4 col-md-6 col-xs-12 sd-card-container">
    <div className="sd-card">
      <div className="sd-card-body">
        <div className="info">
          <div className="sd-name">{slideDeck.uid}</div>
          <div className="sd-repo-name">
            <a href={pathFor('repo', {ownerName: slideDeck.repo.ownerName, repoName: slideDeck.repo.name})}>
              {slideDeck.getFullRepoName()}
            </a>
          </div>
          <div className="sd-timestamp">
            <small>created: {moment(slideDeck.createdAt).format('MMMM Do YY')}</small>
          </div>
        </div>
        <div className="actions">
          <a className="btn btn-sm btn-secondary" href={pathFor('slide_deck', {slideDeckUid: slideDeck.uid})}>View</a>
          <a className="btn btn-sm btn-secondary" href={pathFor('slide_deck.wizard', {slideDeckUid: slideDeck.uid})}>Edit</a>
        </div>
      </div>
    </div>
  </li>
);

export default SlideDeckList;
