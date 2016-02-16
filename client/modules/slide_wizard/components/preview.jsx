import React from 'react';

import SlideRenderer from '/client/modules/slide_engine/components/slide_renderer.jsx';
import Thumbnail from './preview.thumbnail.jsx';

export default React.createClass({
  render() {
    return (
      <ul className="list-unstyled">
        {this.renderThumbnails()}
      </ul>
    );
  },

  renderThumbnails() {
    const {slides, showSlide} = this.props;
    if (! slides) {
      return;
    }

    return slides.map(function (slide, index) {
      return (
        <li key={index}>
          <Thumbnail width="200"
            height="200"
            pageWidth="900"
            pageHeight="1440"
            showSlide={showSlide}
            slideNumber={slide.number}>
            <SlideRenderer slide={slide} />
          </Thumbnail>
        </li>
      );
    });
  }
});
