import {useDeps, composeAll,compose,  composeWithTracker} from 'mantra-core';

import Wizard from '../components/wizard.jsx';

export const composer = ({context, slideDeckUid}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('slideDeck', slideDeckUid).ready()) {
    let slideDeck = Collections.SlideDecks.findOne({uid: slideDeckUid});
    let files = Collections.Files.find().fetch();
    let pullRequest = Collections.PullRequests.findOne({
      ownerName: slideDeck.repo.ownerName,
      repoName: slideDeck.repo.name
    });

    onData(null, {
      slideDeck,
      pullRequest,
      files
    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  showSlide: actions.slideDecks.showSlide,
  reorderSlide: actions.slideDecks.reorderSlide,
  updateSlide: actions.slideDecks.updateSlide,
  getFiles: actions.files.getFiles,
  getSinglePullRequest: actions.pull_requests.getSinglePullRequest
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Wizard);
