import React from 'react';

import StatusBar from '../containers/status_bar';
import Slide from './slide.jsx';

class SlideEngine extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    document.body.classList.add('no-overscroll');
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.body.classList.remove('no-overscroll');
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const {slideDeck, currentUser} = this.props;
    let index = slideDeck.currentSlide - 1;
    let currentSlide = slideDeck.slides[index];

    return (
      <div className="presentation">
        <Slide slide={currentSlide} />
        <StatusBar totalSlidesCount={slideDeck.slides.length}
                   currentSlideNumber={slideDeck.currentSlide}
                   slideDeck={slideDeck}
                   currentUser={currentUser} />
      </div>
    );
  }

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
}

export default SlideEngine;
