import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Repos = new Mongo.Collection('repos');

let schema = new SimpleSchema({
  meta: {
    type: Object
  },
  // id of the repo returned by GitHub API
  'meta.id': {
    type: Number
  },
  name: {
    type: String
  },
  owner: {
    type: String
  },
  private: {
    type: Boolean
  },
  fork: {
    type: Boolean
  },
  activated: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  hasWebhook: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (! this.isInsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

Repos.attachSchema(schema);

Repos.helpers({
  getFullName() {
    return `${this.owner}/${this.name}`;
  }
});

export default Repos;
