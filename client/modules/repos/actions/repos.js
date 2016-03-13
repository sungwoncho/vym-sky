export default {
  syncRepos({Meteor}) {
    Meteor.call('users.syncRepos');
  },
  toggleActivatedStatus({Meteor}, repoId) {
    Meteor.call('repos.toggleActivatedStatus', repoId);
  },
  addCollaborator({Meteor}, repoId, userId) {
    Meteor.call('repos.addCollaborator', repoId, userId);
  },
  removeCollaborator({Meteor}, repoId, userId) {
    Meteor.call('repos.removeCollaborator', repoId, userId);
  }
};
