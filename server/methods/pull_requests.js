import GithubAPI from 'github';
import parseDiff from 'parse-diff';
import {PullRequests} from '/lib/collections';
import {Repos} from '/lib/collections';
import {check} from 'meteor/check';
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

let github = new GithubAPI({version: '3.0.0'});

export default function() {
  Meteor.methods({
    'pullRequests.getOne'(repoId, prNumber) {
      check(repoId, String);
      check(prNumber, Number);

      let repo = Repos.findOne(repoId);
      if (!repo) {
        return console.log('Invalid repo');
      }
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      let options = {
        user: repo.ownerName,
        repo: repo.name,
        number: prNumber
      };

      github.pullRequests.get(options, Meteor.bindEnvironment(function (err, pr) {
        if (err) {
          console.log(`Error while getting pull requests for ${repo.name}`);
          return console.log(err);
        }

        let prDoc = {
          meta: {
            id: pr.id,
            createdAt: new Date(pr.created_at),
            updatedAt: pr.updated_at ? new Date(pr.updated_at) : null
          },
          repoId: repo._id,
          number: pr.number,
          title: pr.title,
          body: pr.body,
          head: pr.head,
          base: pr.base
        };

        PullRequests.upsert({'meta.id': pr.id}, {$set: prDoc});
      }));
    },

    'pullRequests.sync'(repoId) {
      check(repoId, String);

      let user = Meteor.users.findOne(this.userId);
      let repo = Repos.findOne(repoId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      github.pullRequests.getAll({
        user: repo.ownerName,
        repo: repo.name,
        state: 'all'
      }, Meteor.bindEnvironment(function (err, prs) {
        if (err) {
          return console.log('Error while syncing pull requests', err);
        }

        prs.forEach(function (pr) {
          let prDoc = {
            meta: {
              id: pr.id,
              createdAt: new Date(pr.created_at),
              updatedAt: new Date(pr.updated_at)
            },
            repoId,
            number: pr.number,
            title: pr.title,
            body: pr.body,
            head: pr.head,
            base: pr.base,
            htmlUrl: pr.html_url
          };

          PullRequests.upsert({'meta.id': pr.id}, {$set: prDoc});
        });
      }));
    },

    'pullRequests.getDiff'(prId) {
      check(prId, String);

      let pr = PullRequests.findOne(prId);
      if (!pr) {
        return console.log('pull request not found');
      }

      let repo = Repos.findOne(pr.repoId);
      let owner = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: owner.services.github.accessToken
      });

      github.pullRequests.get({
        headers: {Accept: 'application/vnd.github.VERSION.diff'},
        user: repo.ownerName,
        repo: repo.name,
        number: pr.number
      }, Meteor.bindEnvironment(function (err, rawDiff) {
        if (err) {
          return console.log(err);
        }

        let changedFiles = parseDiff(rawDiff);

        PullRequests.update(prId, {$set: {files: changedFiles}});
      }));
    }
  });
}
