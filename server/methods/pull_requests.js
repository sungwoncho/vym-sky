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
        };
      });

      return {
        pullRequests,
        nextPage: getNextPage(link)
      };

    }

  });
}
