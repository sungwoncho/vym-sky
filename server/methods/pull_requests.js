import GithubAPI from 'github';
import parseDiff from 'parse-diff';
import {PullRequests} from '/lib/collections';
import {Repos} from '/lib/collections';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {getNextPage} from '../libs/repo_utils';

let github = new GithubAPI({version: '3.0.0'});

export default function () {
  Meteor.methods({
    'pullRequests.getOne'(ownerName, repoName, prNumber) {
      check(ownerName, String);
      check(repoName, String);
      check(prNumber, Number);
      console.log('getting pr');
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      let pullRequest = Meteor.wrapAsync(github.pullRequests.get)({
        user: ownerName,
        repo: repoName,
        number: prNumber
      });

      return pullRequest;
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
    },

    'pullRequests.getAll'(ownerName, repoName, page = 1) {
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      let pullRequests = Meteor.wrapAsync(github.pullRequests.getAll)({
        user: ownerName,
        repo: repoName,
        state: 'all',
        per_page: 50,
        page
      });
      let link = pullRequests.meta.link;

      pullRequests = pullRequests.map(pr => {
        return {
          meta: {
            id: pr.id,
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at)
          },
          number: pr.number,
          title: pr.title,
          body: pr.body,
          head: pr.head,
          base: pr.base,
          htmlUrl: pr.html_url
        }
      });

      return {
        pullRequests,
        nextPage: getNextPage(link)
      };

    }

  });
}
