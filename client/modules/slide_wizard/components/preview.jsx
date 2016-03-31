import React from 'react';
import classNames from 'classnames';


import Slide from '/client/modules/slide_engine/components/slide.jsx';
import Thumbnail from './thumbnail.jsx';
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
    const {slides, showSlide, currentSlideNumber, slideNumber} = this.props;

    if (!slides) {
      console.log('no slide');
      return;
    }

    return slides.map((slide, index) => {
      let isActive = currentSlideNumber === slide.number;

      return (
        <ThumbnailWrapper isActive={isActive}
          showSlide={showSlide}
          slide={slide} />
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

const ThumbnailWrapper = ({isActive, showSlide, slide}) => {
  let itemClass = classNames('thumbnail-item', {
    active: isActive
  });

  function navigateToSlide(e) {
    e.preventDefault();

    showSlide(slide.number);
  }

  return (
    <li className={itemClass} onClick={navigateToSlide}>
      <div className="slide-number">
        {slide.number}
      </div>
      <Thumbnail
        isActive={isActive}
        slideId={slide.uid}
        slideNumber={slide.number}>
        <Slide slide={slide} />
      </Thumbnail>
    </li>
  );
};
