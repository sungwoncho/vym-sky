import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/libs/collections';

Meteor.methods({
  'slideDecks.goToSlide'(slideDeckId, slideNumber) {
    check(slideDeckId, String);
    check(slideNumber, Number);

    SlideDecks.update(slideDeckId, {$set: {currentSlide: slideNumber}});
  },
  'slideDecks.create'(sdDoc) {
    check(sdDoc, Object);

    let possibleDup = SlideDecks.findOne(sdDoc);
    if (possibleDup) {
      return possibleDup._id;
    }

    return SlideDecks.insert(sdDoc);
  }
});
