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
    type: Object
  },
  'owner._id': {
    type: String
  },
  'owner.type': {
    type: String,
    allowedValues: [
      'user',
      'organization'
    ]
  },
  // github username or orgnization name
  'owner.name': {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  private: {
    type: Boolean
  },
  fork: {
    type: Boolean
  },
  activated: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return {$setOnInsert: false};
      }
    }
  },
  hasWebhook: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return {$setOnInsert: false};
      }
    }
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
  },
  collaboratorIds: {
    type: [String],
    optional: true
  }
});

Repos.attachSchema(schema);

Repos.helpers({
  getFullName() {
    return `${this.owner.name}/${this.name}`;
  }
});

export default Repos;
