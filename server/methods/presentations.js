import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Presentations} from '/libs/collections';

Meteor.methods({
  'presentations.create'(presDoc) {
    check(presDoc, Object);

    Prsentations.insert(presDoc);
  },
});
