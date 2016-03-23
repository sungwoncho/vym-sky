import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Dashboard from '../components/dashboard.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('collaboratingRepos').ready() &&
      Meteor.subscribe('currentUser').ready() &&
      Meteor.subscribe('slideDecksForCurrentUser').ready()) {

    let currentUser = Meteor.user();
    let repos = Collections.Repos.find({
      collaboratorIds: Meteor.userId()
    }).fetch();
    let slideDecks = Collections.SlideDecks.find({}, {sort: {createdAt: -1}}).fetch();

    onData(null, {currentUser, repos, slideDecks});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Dashboard);
