export default {
  syncRepos({Meteor}) {
    Meteor.call('users.syncRepos');
  },
  toggleActivatedStatus({Meteor}, repoId) {
    Meteor.call('repos.toggleActivatedStatus', repoId);
  }
};
