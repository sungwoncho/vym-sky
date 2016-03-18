export default {
  syncRepos({Meteor}, done) {
    Meteor.call('repos.getAll', 1, (err, res) => {
      console.log('this is res', res);
      done(err, res);
    });
  },

  getReposToAdd({Meteor, Collections}, page = 1, done) {
    Meteor.call('repos.getAll', page, function (err, res) {
      res.repos.forEach(function (repo) {
        Collections.ReposToAdd.insert(repo);
      });

      if (done) {
        done(null, res.nextPage);
      }
    });
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
  }
};
