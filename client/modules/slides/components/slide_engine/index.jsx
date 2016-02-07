import React from 'react';
import _ from 'lodash';

import SingleSlide from '../single/index.jsx';

let Components = {
  singleSlide: SingleSlide
};

const SlideEngine = React.createClass({
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

    let ModuleName = Components[currentSlide.type + "Slide"];
    return  <ModuleName data={currentSlide.data} />;
  }
});

export default SlideEngine;
