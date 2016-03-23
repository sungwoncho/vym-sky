import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RepoSlides from '../components/repo_slides.jsx';

export const composer = ({context, repo}, onData) => {
  const {Collections, Meteor} = context();

  if (Meteor.subscribe('slideDecksForRepo', repo._id).ready()) {
    let slideDecks = Collections.SlideDecks.find(
      {repoId: repo._id}, {sort: {createdAt: -1}}).fetch();

    onData(null, {slideDecks});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RepoSlides);
