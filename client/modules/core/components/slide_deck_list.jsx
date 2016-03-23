import React from 'react';
import moment from 'moment';

import {pathFor} from '/client/modules/core/libs/helpers';


const SlideDeckList = ({slideDecks, currentUser}) => (
  <ul className="list-unstyled row">
    {
      slideDecks.map(function (sd) {
        return <SlideDeckItem slideDeck={sd}
          currentUser={currentUser}
          key={sd.uid} />;
      })
    }
  </ul>
);

const SlideDeckItem = ({slideDeck, currentUser}) => {
  let canEdit = currentUser._id === slideDeck.ownerId;

  return (
    <li className="col-lg-4 col-md-6 col-xs-12 sd-card-container">
      <div className="sd-card">
        <div className="sd-card-body">
          <div className="info">
            <div className="sd-name">{slideDeck.title}</div>
            <div className="sd-repo-name">
              <a href={pathFor('repo', {
                ownerName: slideDeck.repo.ownerName, repoName: slideDeck.repo.name})}>
                {slideDeck.getFullRepoName()}
              </a>
            </div>
            <div className="sd-timestamp">
              <small>created: {moment(slideDeck.createdAt).format('MMMM Do YY')}</small>
            </div>
          </div>
          <div className="actions">
            <a className="btn btn-sm btn-secondary"
              href={pathFor('slide_deck', {slideDeckUid: slideDeck.uid})}>View</a>
            {
              canEdit ?
                <a className="btn btn-sm btn-secondary"
                  href={pathFor('slide_deck.wizard', {slideDeckUid: slideDeck.uid})}>Edit</a> :
              <span></span>
            }
          </div>
        </div>
      </div>
    </li>
  );
};

export default SlideDeckList;
