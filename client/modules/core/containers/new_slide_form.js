import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import NewSlideForm from '../components/new_slide_form.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createDeck: actions.slide_decks.createSlideDeck
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewSlideForm);
