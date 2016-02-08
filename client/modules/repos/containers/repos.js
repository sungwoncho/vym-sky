import Repos from '../components/repos.jsx';
import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('ownedRepos').ready()) {

    const repos = Collections.Repos.find({
      'owner._id': Meteor.userId(),
      activated: true
    }).fetch();

    onData(null, {repos});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Repos);
