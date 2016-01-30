import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Repos = new Mongo.Collection('repos');

let schema = new SimpleSchema({
  name: {
    type: String
  },
  // id of the repo returned by GitHub API
  id: {
    type: Number
  },
  activated: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  private: {
    type: Boolean
  },
  fork: {
    type: Boolean
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

export default Repos;
