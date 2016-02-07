import {Meteor} from 'meteor/meteor';
import {SlideDecks} from '/libs/collections';

Meteor.methods({
  'slideDecks.goToSlide'(slideDeckId, slideNumber) {
    SlideDecks.update(slideDeckId, {$set: {currentSlide: slideNumber}});
  }
});
