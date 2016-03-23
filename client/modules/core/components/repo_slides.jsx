import React from 'react';

import SlideDeckList from '../containers/slide_deck_list';
import NewSlideForm from '../containers/new_slide_form';
import {pathFor} from '/client/modules/core/libs/helpers';


const RepoSlides = ({sectionState, slideDecks, repo}) => (
  <div>
    {
      sectionState === 'new' ?
        <NewSlideForm repo={repo} /> :
        <div>
          <div className="slides-menu">
            <div className="text-xs-centera">
              <a className="btn btn-md btn-success"
                href={
                  pathFor('repo', {
                    repoName: repo.name,
                    ownerName: repo.ownerName,
                    section: 'slides',
                    sectionState: 'new'})
                  }>
                Add new slides
              </a>
            </div>
          </div>
          <SlideDeckList slideDecks={slideDecks} />
        </div>
    }
  </div>
);


export default RepoSlides;
