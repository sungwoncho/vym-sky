import GithubAPI from 'github';
import {check} from 'meteor/check';
import {Repos} from '/libs/collections';

let github = new GithubAPI({version: '3.0.0'});

Meteor.methods({
  'users.syncRepos'() {
    let currentUser = Meteor.users.findOne(this.userId);

    github.authenticate({
      type: 'oauth',
      token: currentUser.services.github.accessToken
    });

    github.repos.getAll({
      type: 'owner'
    }, Meteor.bindEnvironment(function (err, repos) {
      if (err) {
        return console.log(err);
      }

      repos.forEach(function (repo) {
        console.log(`Saving ${repo.name} for ${currentUser.services.github.username}`);

        let repoDoc = {
          meta: {
            id: repo.id,
          },
          name: repo.name,
          owner: {
            _id: currentUser._id,
            type: 'user',
            name: repo.owner.login
          },
          private: repo.private,
          fork: repo.fork
        };

        Repos.upsert({'meta.id': repo.id}, {$set: repoDoc});
      });
    }));
  }
});
