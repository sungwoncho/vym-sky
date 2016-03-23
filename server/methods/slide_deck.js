import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {SlideDecks, Repos} from '/lib/collections';
import _ from 'lodash';
import shortid from 'shortid';
import _s from '../libs/slide_utils';
import randtoken from 'rand-token';

export default function () {

  function updateSlide(slideDeckId, slideNumber, modifier, options) {
    let slideDeck = SlideDecks.findOne(slideDeckId);
    let slides = slideDeck.slides;

    slides = _s(slides).update({number: slideNumber}, modifier, options)
                       .getVal();

    return SlideDecks.update(slideDeckId, {$set: {slides: slides}});
  }

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
     * @return {String} - uid of the slide deck that was created
     */
    'slideDecks.create'(sdDoc) {
      check(sdDoc, Object);

      // Set uid for slideDeck
      let uid = randtoken.uid(10);
      sdDoc.uid = uid;

      // Denormalize repo data
      let repo = Repos.findOne(sdDoc.repoId);
      sdDoc.repo = {
        name: repo.name,
        ownerName: repo.ownerName,
        id: repo.id
      };

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
        sections: [],
        options: {}
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

      updateSlide(slideDeckId, slideNumber, modifier, options);
    },

    /**
     * Inserts a section inside a slide. If a section exists at the desired position,
       * overwrite it. Can also be used to remove a section by passing an empty
     * Object as sectionDoc.
     */
    'slideDecks.upsertSectionInSlide'(slideDeckId, slideNumber, sectionDoc, position) {
      check(slideDeckId, String);
      check(slideNumber, Number);
      check(sectionDoc, Object);
      check(position, Number);

      // sectionDoc needs position
      sectionDoc.position = position;

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slide = slideDeck.getSlideByNumber(slideNumber);
      let sectionExists = false;

      for (var i = 0; i < slide.sections.length; i++) {
        if (slide.sections[i].position === position) {
          slide.sections[i] = sectionDoc;
          sectionExists = true;
          break;
        }
      }

      if (!sectionExists) {
        slide.sections.push(sectionDoc);
      }

      return updateSlide(slideDeckId, slideNumber, {sections: slide.sections});
    },

    'slideDecks.removeSectionFromSlide'(slideDeckId, slideNumber, position) {
      check(slideDeckId, String);
      check(slideNumber, Number);
      check(position, Number);

      let slideDeck = SlideDecks.findOne(slideDeckId);
      let slide = slideDeck.getSlideByNumber(slideNumber);

      _.remove(slide.sections, function(section) {
        return section.position === position;
      });

      return updateSlide(slideDeckId, slideNumber, {sections: slide.sections});
    }
  });
}
