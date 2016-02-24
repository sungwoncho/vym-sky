import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {SlideDecks} from '/lib/collections';
import _ from 'lodash';
import shortid from 'shortid';
import _s from '../libs/slide_utils';

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
    'slideDecks.updateSlide'(slideDeckId, slideNumber, modifier) {
      check(slideDeckId, String);
      check(slideNumber, Number);
      check(modifier, Object);

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slides = slideDeck.slides;
      console.log(modifier);
      slides = _s(slides).update({number: slideNumber}, modifier)
                         .getVal();

      console.log('slides', slides);

      SlideDecks.update(slideDeckId, {$set: {slides: slides}});
    }
  });  
}
