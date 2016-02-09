import ManageRepo from '../components/repos.manage.jsx';
import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('ownedRepos').ready()) {

    const repos = Collections.Repos.find({
      'owner._id': Meteor.userId()
    }).fetch();

    onData(null, {repos});
  }
};

export const depsMapper = (context, actions) => ({
  syncRepos: actions.repos.syncRepos,
  toggleActivatedStatus: actions.repos.toggleActivatedStatus,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ManageRepo);
