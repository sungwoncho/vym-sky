import React from 'react';
import _ from 'lodash';

import SlideProgress from './slide_progress.jsx';
import Slide from './slide.jsx';

const SlideEngine = React.createClass({
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  },

  render() {
    const {slideDeck} = this.props;

    return (
      <div>
        {this.renderCurrentSlide()}
        <SlideProgress totalSlidesCount={slideDeck.slides.length}
                       currentSlideNumber={slideDeck.currentSlide} />
      </div>
    );
  },

  renderCurrentSlide() {
    const {slideDeck} = this.props;

    let index = slideDeck.currentSlide - 1;
    let currentSlide = slideDeck.slides[index];

    return <Slide slide={currentSlide} />;
  },

  handleKeyDown(e) {
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const {slideDeck, nextSlide, prevSlide} = this.props;

    if (e.keyCode === LEFT_ARROW) {
      prevSlide(slideDeck._id);
    } else if (e.keyCode === RIGHT_ARROW) {
      nextSlide(slideDeck._id);
    }
  }
});

export default SlideEngine;
