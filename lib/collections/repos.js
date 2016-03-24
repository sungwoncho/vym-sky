import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _ from 'lodash';

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
  // github username or orgnization name
  ownerName: {
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
  hasWebhook: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return {$setOnInsert: false};
      }
    }
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
  updatedAt: {
    type: Date,
    autoValue() {
      if (!this.isInsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  collaboratorIds: {
    type: [ String ],
    optional: true
  }
});

Repos.attachSchema(schema);

Repos.helpers({
  getFullName() {
    return `${this.ownerName}/${this.name}`;
  },

  canBeAccessedBy(userId) {
    return _.includes(this.collaboratorIds, userId);
  }
});

export default Repos;
