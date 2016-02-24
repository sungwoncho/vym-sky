import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Presentations} from '/lib/collections';

export default function () {
  Meteor.methods({
    'presentations.create'(presDoc) {
      check(presDoc, Object);

      Prsentations.insert(presDoc);
    },
  });  
}
