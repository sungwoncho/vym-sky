import React from 'react';

import SlideRenderer from '/client/modules/slide_engine/components/slide_renderer.jsx';
import Thumbnail from './preview.thumbnail.jsx';
import SortableMixin from 'sortablejs/react-sortable-mixin';

export default React.createClass({
  mixins: [SortableMixin],

  sortableOptions: {
    model: 'slides',
    ref: 'thumbnailList',
    onEnd: 'handleThumbnailMove'
  },

  render() {
    return (
      <ul className="list-unstyled" ref="thumbnailList">
        {this.renderThumbnails()}
      </ul>
    );
  },

  renderThumbnails() {
    const {slides, showSlide, currentSlideNumber} = this.props;
    if (! slides) {
      console.log('no slide');
      return;
    }

    return slides.map(function (slide, index) {
      let isActive = currentSlideNumber === slide.number;

      return (
        <li key={index}>
          <Thumbnail width="200"
            height="200"
            pageWidth="900"
            pageHeight="1440"
            showSlide={showSlide}
            isActive={isActive}
            slideId={slide.uid}
            slideNumber={slide.number}>
            <SlideRenderer slide={slide} />
          </Thumbnail>
        </li>
      );
    });
  },

  handleThumbnailMove(e) {
    const {onThumbnailMove} = this.props;

    let fromSlideNumber = e.oldIndex + 1;
    let toSlideNumber = e.newIndex + 1;

    onThumbnailMove(fromSlideNumber, toSlideNumber);
  }
});
