import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Section from '../components/section.jsx';

export const composer = ({context, files, section, sectionPosition, onSetSection, onRemoveSection, editMode, height = 'auto', width = 'auto'}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  updateSlide: actions.slideDecks.updateSlide
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Section);
