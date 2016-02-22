import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/libs/collections';
import _ from 'lodash';
import shortid from 'shortid';

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
  'slideDecks.addSlideInDeck'(slideDeckId, slideNumber) {
    check(slideDeckId, String);
    check(slideNumber, Number);

    let newSlide = {
      number: slideNumber,
      uid: shortid.generate(),
      data: {}
    };

    SlideDecks.update(slideDeckId, {$addToSet: {slides: newSlide}});

    let slides = SlideDecks.findOne(slideDeckId).slides;
    slides.forEach(function (slide) {
      if (slide.number > slideNumber) {
        slide.number++;
      }
    });
    SlideDecks.update(slideDeckId, {$set: {slides: slides}});

    return newSlide;
  },
  /**
   * @return {Object} - an object containing info about neighboring slides.
   *         Used by the wizard to navigate to other slides after removal.
   */
  'slideDecks.removeSlideInDeck'(slideDeckId, slideNumber) {
    check(slideDeckId, String);
    check(slideNumber, Number);

    let slideDeck = SlideDecks.findOne(slideDeckId);
    let slide = slideDeck.getSlideByNumber(slideNumber);
    let nextSlide = slideDeck.getSlideByNumber(slideNumber + 1);
    let prevSlide = slideDeck.getSlideByNumber(slideNumber - 1);

    // Decrement `number` of slides that come after the slide to remove
    let slides = SlideDecks.findOne(slideDeckId).slides;
    slides.forEach(function (s) {
      if (s.number > slideNumber) {
        s.number--;
      }
    });

    SlideDecks.update(slideDeckId, {$set: {slides: slides}});
    SlideDecks.update(slideDeckId, {$pull: {slides: {uid: slide.uid}}});

    return {
      hasPrevSlide: !!prevSlide,
      hasNextSlide: !!nextSlide
    };
  }
});
