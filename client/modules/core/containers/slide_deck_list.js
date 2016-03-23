import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import SlideDeckList from '../components/slide_deck_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor} = context();

  onData(null, {
    currentUser: Meteor.user()
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SlideDeckList);
