import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SlideDeckList from '../components/slide_deck_list.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  showNewSlideDeckForm: actions.slide_decks.showNewSlideDeckForm
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SlideDeckList);
