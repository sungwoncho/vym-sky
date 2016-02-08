import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/libs/collections';

Meteor.methods({
  'slideDecks.goToSlide'(slideDeckId, slideNumber) {
    check(slideDeckId, String);
    check(slideNumber, Number);

    SlideDecks.update(slideDeckId, {$set: {currentSlide: slideNumber}});
  },
});
