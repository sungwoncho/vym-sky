export default {
  syncRepos({Meteor, Collections}) {
    Meteor.call('users.syncRepos');
  }
};
