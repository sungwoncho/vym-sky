import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import NewSlideForm from '../components/new_slide_form.jsx';

export const composer = ({context}, onData) => {
  const {Collections} = context();

  let pullRequests = Collections.PullRequests.find().fetch();
  onData(null, {pullRequests});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createDeck: actions.slide_decks.createSlideDeck,
  getPullRequests: actions.pull_requests.getPullRequests
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewSlideForm);
