import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Presentations} from '/lib/collections';

Meteor.methods({
  'presentations.create'(presDoc) {
    check(presDoc, Object);

    Prsentations.insert(presDoc);
  },
});
