import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ToolbarTypeSelector from '../components/toolbar_type_selector.jsx';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  updateSlide: actions.slideDecks.updateSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ToolbarTypeSelector);
