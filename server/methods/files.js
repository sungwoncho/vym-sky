import GithubAPI from 'github';
import parseDiff from 'parse-diff';
import {PullRequests} from '/lib/collections';
import {Repos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

let github = new GithubAPI({version: '3.0.0'});

export default function () {
  Meteor.methods({
    'files.getAll'(pullRequestId) {
      let pr = PullRequests.findOne(pullRequestId);
      console.log('pr', pr);
      let repo = Repos.findOne(pr.repoId);
      let user = Meteor.users.findOne(this.userId);

      github.authenticate({
        type: 'oauth',
        token: user.services.github.accessToken
      });

      let response = Meteor.wrapAsync(github.repos.compareCommits)({
        user: repo.owner.name,
        repo: repo.name,
        base: pr.base.sha,
        head: pr.head.sha
      });

      let files = response.files;
      files.forEach(function (file) {
        if (file.patch) {
          file.patch = parseDiff(file.patch);
        }
        file.prId = pullRequestId;
      });

      return files;
    }
  });
}
