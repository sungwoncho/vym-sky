import GithubAPI from 'github';
import {check} from 'meteor/check';
import {Repos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';

let github = new GithubAPI({version: '3.0.0'});

export default function () {
  Meteor.methods({
    'users.syncRepos'(page = 1) {
      let currentUser = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: currentUser.services.github.accessToken
      });

      github.repos.getAll({
        type: 'owner',
        page
      }, Meteor.bindEnvironment((err, repos) => {
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
            description: repo.description,
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

        // Recurse if the response is paginated
        function getNextPage(link) {
          let re = /page=(\d).*>; rel="next"/;
          let result = re.exec(link);

          if (result) {
            return result[1];
          }
        }

        let nextPage = getNextPage(repos.meta.link);
        if (nextPage) {
          Meteor.call('users.syncRepos', nextPage);
        } else {
          // Update the timestamp for syncing repo
          console.log('Updating reposLastSyncedAt for', this.userId);
          Meteor.users.update(this.userId, {$set: {reposLastSyncedAt: new Date()}});
        }
      }));
    },

    'users.setScopes'(userId, scopes) {
      check(userId, String);
      check(scopes, Array);

      Meteor.users.update(userId, {$set: {scopes}});
    }
  });
}
