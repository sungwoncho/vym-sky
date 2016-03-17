export default {
  syncRepos({Meteor}, done) {
    Meteor.call('repos.syncForUser', 1, (err, res) => {
      console.log('this is res', res);
      done(err, res);
    });
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
