import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/libs/collections';
import _ from 'lodash';

Meteor.methods({
  /**
  * Used to navigate in presentation or preview mode
  */
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
  },
  // TODO: Write test
  'slideDecks.removeSlideInDeck'(slideDeckId, slideNumber) {
    check(slideDeckId, String);
    check(slideNumber, Number);

    SlideDecks.update({_id: slideDeckId, 'slides.number': slideNumber}, {$set: {'slides.$.number': -1}});

    // Update slide numbers to eliminate the jump created by removing the slide
    let slideDeck = SlideDecks.findOne({_id: slideDeckId});
    slideDeck.slides.forEach(function (slide) {
      if (slide.number > slideNumber) {
        slide.number--;
      }
    });

    let slideDeckDoc = _.omit(slideDeck, '_id');
    SlideDecks.update(slideDeckId, {$set: slideDeckDoc});

    SlideDecks.update(slideDeckId, {$pull: {slides: {number: -1}}});
  }
});
