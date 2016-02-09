export default {
  syncPullRequests({Meteor}, repoId) {
    Meteor.call('pullRequests.sync', repoId);
  }
};
