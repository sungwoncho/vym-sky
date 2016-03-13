import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import CollaboratorList from '../components/collaborator_list.jsx';

export const composer = ({context, repo}, onData) => {
  const {Meteor, Collections} = context();
  let collaboratorIds = repo.collaboratorIds || [];

  if (Meteor.subscribe('users', collaboratorIds).ready()) {
    let collaborators = Meteor.users.find({_id: {$in: collaboratorIds}}).fetch();
    onData(null, {collaborators});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  addCollaborator: actions.repos.addCollaborator,
  removeCollaborator: actions.repos.removeCollaborator
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CollaboratorList);
