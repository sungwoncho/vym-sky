import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import HeaderHome from '../components/header_home.jsx';

export const composer = ({context}, onData) => {
  const {FlowRouter} = context();

  let currentRouteName = FlowRouter.getRouteName();

  onData(null, {
    currentRouteName
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderHome);
