import github from 'octonode';
import {PullRequests} from '/libs/collections';

Meteor.methods({
  activateRepo(repoId) {
    let client = github.client(Meteor.user().services.github.accessToken);

    client.hook({

    }, function (err, res) {

    });
  }
});
