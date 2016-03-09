import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Home from '../components/home.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('ownedRepos').ready() &&
      Meteor.subscribe('currentUser').ready()) {

    let repos = Collections.Repos.find({
      'owner._id': Meteor.userId(),
      activated: true
    }).fetch();
    let currentUser = Meteor.user();

    onData(null, {repos, currentUser});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
