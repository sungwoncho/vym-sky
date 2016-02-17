import React from 'react';

import Preview from './preview.jsx';
import SlideRenderer from '/client/modules/slide_engine/components/slide_renderer.jsx';

export default React.createClass({
  render() {
    const {slideDeck, showSlide, currentSlideNumber} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 preview-container">
            <Preview slides={slideDeck.slides}
              showSlide={showSlide}
              currentSlideNumber={currentSlideNumber} />
          </div>
          <div className="col-sm-10 slide-container">
            {this.renderCurrentSlide()}
          </div>
        </div>
      </div>
    );
  },

  renderCurrentSlide() {
    const {slideDeck, slideNumber} = this.props;
    let currentSlide = slideDeck.getSlideByNumber(parseInt(slideNumber) || 1);

    if (currentSlide) {
      return <SlideRenderer slide={currentSlide} />;
    } else {
      return (
        <div>
          No slide
        </div>
      );
    }
  }
});
