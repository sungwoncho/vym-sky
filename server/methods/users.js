import github from 'octonode';
import {check} from 'meteor/check';
import {Repos} from '/libs/collections';

Meteor.methods({
  'users.syncRepos'() {
    let client = github.client(Meteor.user().services.github.accessToken);
    let ghme = client.me();

    ghme.repos(Meteor.bindEnvironment(function (err, repos) {
      if (err) {
        return console.log('Error occurred while getting repos', err);
      }

      repos.forEach(function(repo) {
        console.log('Saving', repo.name);

        let repoDoc = {
          meta: {
            id: repo.id,
          },
          name: repo.name,
          owner: repo.owner.login,
          private: repo.private,
          fork: repo.fork
        };

        Repos.upsert({'meta.id': repo.id}, {$set: repoDoc});
      });

      console.log('saved all repos');
    }));
  }
});
