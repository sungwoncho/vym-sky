import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {SlideDecks} from '/lib/collections';
import _ from 'lodash';
import shortid from 'shortid';
import _s from '../libs/slide_utils';
import randtoken from 'rand-token';

export default function () {
  Meteor.methods({
    /**
    * Used to navigate in presentation or preview mode
    */
    'slideDecks.goToSlide'(slideDeckId, slideNumber) {
      check(slideDeckId, String);
      check(slideNumber, Number);

      SlideDecks.update(slideDeckId, {$set: {currentSlide: slideNumber}});
    },
    /**
     * Generates a uid for a given slideDeck document and inserts it into the
     * database
     */
    'slideDecks.create'(sdDoc) {
      check(sdDoc, Object);

      let possibleDup = SlideDecks.findOne(sdDoc);
      if (possibleDup) {
        return possibleDup.uid;
      }

      // Set uid for slideDeck
      let uid = randtoken.uid(10);
      sdDoc.uid = uid;

      SlideDecks.insert(sdDoc);
      return uid;
    },
    'slideDecks.addSlideInDeck'(slideDeckId, slideNumber) {
      check(slideDeckId, String);
      check(slideNumber, Number);

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slides = slideDeck.slides;
      let newSlide = {
        number: slideNumber,
        uid: shortid.generate(),
        data: {}
      };

      slides = _s(slides).bumpNumbers(slideNumber, slides.length, 1)
                .add(newSlide)
                .sort()
                .getVal();

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
      let slides = slideDeck.slides;
      let targetSlide = slideDeck.getSlideByNumber(slideNumber);
      let nextSlide = slideDeck.getSlideByNumber(slideNumber + 1);
      let prevSlide = slideDeck.getSlideByNumber(slideNumber - 1);

      slides = _s(slides).bumpNumbers(slideNumber, slides.length, -1)
                         .remove({uid: targetSlide.uid})
                         .sort()
                         .getVal();

      SlideDecks.update(slideDeckId, {$set: {slides: slides}});

      return {
        hasPrevSlide: !!prevSlide,
        hasNextSlide: !!nextSlide
      };
    },
    'slideDecks.reorderSlide'(slideDeckId, fromSlideNumber, toSlideNumber) {
      check(slideDeckId, String);
      check(fromSlideNumber, Number);
      check(toSlideNumber, Number);

      let min = Math.min(fromSlideNumber, toSlideNumber);
      let max = Math.max(fromSlideNumber, toSlideNumber);
      let isMovingDown = toSlideNumber > fromSlideNumber;
      let delta = isMovingDown ? -1 : 1;

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slides = slideDeck.slides;
      let targetSlide = slideDeck.getSlideByNumber(fromSlideNumber);

      slides = _s(slides).bumpNumbers(min, max, delta)
                         .setSlideNumber(targetSlide.uid, toSlideNumber)
                         .sort()
                         .getVal();

      SlideDecks.update(slideDeckId, {$set: {slides: slides}});
    },

    /**
     * @param [options] - options (see slide_utils.update for more details)
     *        resetData: Resets the slide data before applying the modifier
     */
    'slideDecks.updateSlide'(slideDeckId, slideNumber, modifier, options) {
      check(slideDeckId, String);
      check(slideNumber, Number);
      check(modifier, Object);
      check(options, Match.Optional(Object));

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slides = slideDeck.slides;

      slides = _s(slides).update({number: slideNumber}, modifier, options)
                         .getVal();

      SlideDecks.update(slideDeckId, {$set: {slides: slides}});
    }
  });
}
