import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/libs/collections';

Meteor.methods({
  // Used in presentation mode
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
  },
  'slideDecks.addSlideInDeck'(slideDeckId) {
    check(slideDeckId, String);

    let slideDeck = SlideDecks.findOne(slideDeckId);
    let lastSlideNumber = slideDeck.getLastSlide().number;

    let newSlide = {
      number: lastSlideNumber + 1,
      data: {}
    };

    SlideDecks.update(slideDeckId, {$addToSet: {slides: newSlide}});

    return newSlide;
  }
});
