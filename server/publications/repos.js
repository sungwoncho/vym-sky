import {Repos, SlideDecks} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {check} from 'meteor/check';
import moment from 'moment';

export default function () {
  Meteor.publish('collaboratingRepos', function () {
    if (!this.userId) {
      this.ready();
      return;
    }

    return Repos.find({collaboratorIds: this.userId});
  });

  Meteor.publish('repo', function (ownerName, repoName) {
    check(ownerName, String);
    check(repoName, String);

    return Repos.find({ownerName, name: repoName});
  });

  Meteor.publish('monthlyUsage', function (repoId) {
    let cursor = SlideDecks.find({
      repoId,
      createdAt: {
        $gte: moment().subtract(1, 'months').toDate()
      }
    });

    console.log(cursor.fetch());

    Counts.publish(this, 'monthlySlideDeckUsage', cursor);
  });
}
