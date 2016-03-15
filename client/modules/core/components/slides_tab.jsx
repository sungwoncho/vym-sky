import React from 'react';

import SlideDeckList from '../containers/slide_deck_list';
import {pathFor} from '/client/modules/core/libs/helpers';


const SlidesTab = ({slideDecks, repo}) => (
  <div>
    <div className="slides-menu">
      <div className="text-xs-centera">
        <a className="btn btn-md btn-success"
          href={pathFor('slide_deck.new', {repoName: repo.name, ownerName: repo.owner.name})}>
          Add new slides
        </a>
      </div>
    </div>
    <SlideDeckList slideDecks={slideDecks} />
  </div>
);

export default SlidesTab;
