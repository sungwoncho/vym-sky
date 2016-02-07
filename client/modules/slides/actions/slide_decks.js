export default {
  goToSlide({Meteor}, slideDeckId, slideNumber) {
    Meteor.call('slideDecks.goToSlide', slideDeckId, slideNumber);
  },

  nextSlide({Meteor, Collections}, slideDeckId) {
    let slideDeck = Collections.SlideDecks.findOne(slideDeckId);
    let currentSlide = slideDeck.currentSlide;
    let totalSlides = slideDeck.slides.length;

    if (currentSlide < totalSlides) {
      Meteor.call('slideDecks.goToSlide', slideDeckId, currentSlide + 1);
    }
  },

  prevSlide({Meteor, Collections}, slideDeckId) {
    let slideDeck = Collections.SlideDecks.findOne(slideDeckId);
    let currentSlide = slideDeck.currentSlide;

    if (currentSlide > 1) {
      Meteor.call('slideDecks.goToSlide', slideDeckId, currentSlide - 1);
    }
  }
};
