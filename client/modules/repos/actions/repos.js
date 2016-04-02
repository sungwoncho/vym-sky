export default {
  getReposToAdd({Meteor, Collections}, page = 1, done) {
    Meteor.call('repos.getAll', page, function (err, res) {
      res.repos.forEach(function (repo) {
        Collections.ReposToAdd.upsert({'meta.id': repo.meta.id}, repo);
      });

      if (done) {
        done(null, res.nextPage);
      }
    });
  },

  clearReposToAdd({Collections}) {
    Collections.ReposToAdd.remove({});
  },

  addRepo({Meteor, Collections}, repo) {
    Meteor.call('repos.add', repo);
    Collections.ReposToAdd.update({'meta.id': repo.meta.id}, {$set: {added: true}});
  },

  toggleActivatedStatus({Meteor}, repoId) {
    Meteor.call('repos.toggleActivatedStatus', repoId);
  },

  addCollaborator({Meteor}, repoId, userId) {
    Meteor.call('repos.addCollaborator', repoId, userId);
  },

  removeCollaborator({Meteor}, repoId, userId) {
    Meteor.call('repos.removeCollaborator', repoId, userId);
  },

  downgradePlan({Meteor}, repoId) {
    Meteor.call('repos.downgrade', repoId);
  }
};
