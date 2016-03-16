import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const PullRequests = new Mongo.Collection('pullRequests');

let schema = new SimpleSchema({
  meta: {
    type: Object
  },
  // id of the pull request returned by GitHub API
  'meta.id': {
    type: Number
  },
  // when the pr was opened
  'meta.createdAt': {
    type: Date
  },
  // when the pr was opened
  'meta.updatedAt': {
    type: Date
  },
  repoId: {
    type: String
  },
  number: {
    type: Number
  },
  title: {
    type: String
  },
  body: {
    type: String,
    optional: true
  },
  head: {
    type: Object,
    blackbox: true
  },
  base: {
    type: Object,
    blackbox: true
  },
  files: {
    type: [ Object ],
    blackbox: true,
    optional: true
  },
  state: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return 'open';
      } else if (this.isUpsert) {
        return {$setOnInsert: 'open'};
      }
    },
    allowedValues: [
      'open',
      'merged',
      'closed'
    ],
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  htmlUrl: {
    type: String
  }
});

PullRequests.attachSchema(schema);

PullRequests.helpers({
  getFullTitle() {
    return `#${this.number} / ${this.title}`;
  }
});

export default PullRequests;
