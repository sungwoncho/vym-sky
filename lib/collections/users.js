import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

let schema = new SimpleSchema({
  profile: {
    type: Object,
    blackbox: true
  },
  services: {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date
  },
  reposLastSyncedAt: {
    type: Date,
    optional: true
  },
  scopes: {
    type: [ String ],
    optional: true
  },
  organizations: {
    type: [ Object ],
    blackbox: true
  }
});

Meteor.users.attachSchema(schema);

export default Meteor.users;