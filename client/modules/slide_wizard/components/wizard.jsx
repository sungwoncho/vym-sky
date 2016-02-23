import React from 'react';

import Preview from './preview.jsx';
import SlideRenderer from '/client/modules/slide_engine/components/slide_renderer.jsx';

export default React.createClass({
  render() {
    const {slideDeck, showSlide, currentSlideNumber, reorderSlide} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 preview-container">
            <Preview slides={slideDeck.slides}
              showSlide={showSlide}
              onThumbnailMove={this.onThumbnailMove}
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
    const {slideDeck, currentSlideNumber} = this.props;
    let currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

    if (currentSlide) {
      return <SlideRenderer slide={currentSlide} />;
    } else {
      return (
        <div>
          No slide
        </div>
      );
    }
  },

  onThumbnailMove(fromSlideNumber, toSlideNumber) {
    if (fromSlideNumber === toSlideNumber) {
      return;
    }

    const {slideDeck, reorderSlide} = this.props;

    reorderSlide(slideDeck._id, fromSlideNumber, toSlideNumber);
  }
});
