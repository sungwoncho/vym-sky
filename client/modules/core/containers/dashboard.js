import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Dashboard from '../components/dashboard.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  // TODO: rather than getting collaboratingRepos, get all repos that user has an
  // acces to
  if (Meteor.subscribe('collaboratingRepos').ready() &&
      Meteor.subscribe('currentUser').ready() &&
      Meteor.subscribe('slideDecksForUser', Meteor.userId()).ready()) {

    let currentUser = Meteor.user();
    let repos = Collections.Repos.find({
      collaboratorIds: Meteor.userId(),
      activated: true
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