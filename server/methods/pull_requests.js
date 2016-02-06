import GithubAPI from 'github';
import parseDiff from 'parse-diff';
import {PullRequests} from '/libs/collections';
import {Repos} from '/libs/collections';
import {check} from 'meteor/check';
import {Mongo} from 'meteor/mongo';

let github = new GithubAPI({version: '3.0.0'});

Meteor.methods({
  'pullRequests.getOne'(repoId, prNumber) {
    check(repoId, String);
    check(prNumber, Number);

    let repo = Repos.findOne(repoId);
    let user = Meteor.users.findOne(this.userId);

    github.authenticate({
      type: 'oauth',
      token: user.services.github.accessToken
    });

    let options = {
      user: repo.owner.name,
      repo: repo.name,
      number: prNumber
    };

    github.pullRequests.get(options, Meteor.bindEnvironment(function (err, pr) {
      if (err) {
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
      headers: {'Accept': 'application/vnd.github.VERSION.diff'},
      user:  repo.owner.name,
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
