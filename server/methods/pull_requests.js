import github from 'octonode';
import parseDiff from 'parse-diff';
import {PullRequests} from '/libs/collections';
import {check} from 'meteor/check';

Meteor.methods({
  /**
   * params has repoName, repoOwner, prNumber
   */
  'pullRequests.get'(params) {
    check(params, Object);

    let fullRepoName = `${params.repoOwner}/${params.repoName}`;

    let client = github.client(Meteor.user().services.github.accessToken);
    let ghpr = client.pr(fullRepoName, params.prNumber);

    ghpr.info(function (err, res) {
      let repo = Repos.findOne({name: params.repoName, owner: params.repoOwner});

      let prDoc = {
        meta: {
          id: res.id,
          createdAt: new Date(res.created_at),
          updatedAt: res.updated_at ? new Date(res.updated_at) : null
        },
        repoId: repo._id,
        title: res.title,
        description: '',
        head: res.head,
        base: res.base,
      };

      PullRequests.upsert({'meta.id': res.id}, {$set: prDoc});
    });
  },
  'pullRequests.getDiff'(prId) {
    check(prId, Number);


  }
});
