import React from 'react';
import _ from 'lodash';

import SingleSlide from '../single/index.jsx';

let ComponentMappings = {
  single: SingleSlide
};

const SlideEngine = React.createClass({
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  },

  render() {
    return (
      <div>
        {this.renderCurrentSlide()}
      </div>
    );
  },

  renderCurrentSlide() {
    const {slideDeck} = this.props;

    let index = slideDeck.currentSlide - 1;
    let currentSlide = slideDeck.slides[index];

    let ModuleName = ComponentMappings[currentSlide.type];
    return  <ModuleName data={currentSlide.data} />;
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
