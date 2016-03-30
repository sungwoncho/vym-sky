import React from 'react';

import TypeSelector from '../containers/toolbar_type_selector';

const Toolbar = ({addSlide, removeSlide, updateSlide, slideDeck, currentSlideNumber}) => {
  let currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

  function scrollPreviewToActiveSlide() {
    document.getElementsByClassName('thumbnail-wrapper active')[0].scrollIntoView();
  }

  function handleAddSlide(e) {
    e.preventDefault();
    let targetSlideNumber;

    if (currentSlideNumber) {
      targetSlideNumber = currentSlideNumber + 1;
    } else {
      targetSlideNumber = 1;
    }

    addSlide(slideDeck._id, targetSlideNumber, () => {
      scrollPreviewToActiveSlide();
    });
  }

  function handleRemoveSlide(e) {
    e.preventDefault();

    if (!currentSlideNumber) {
      return;
    }

    removeSlide(slideDeck._id, currentSlideNumber, () => {
      scrollPreviewToActiveSlide();
    });
  }

  return (
    <div className="wz-toolbar">
      <div className="row">
        <div className="col-lg-10 col-lg-offset-1 col-xs-12">
          <div className="wz-toolbar-action" onClick={handleAddSlide}>
            <i className="fa fa-plus"></i>
          </div>
          <div className="wz-toolbar-action" onClick={handleRemoveSlide}>
            <i className="fa fa-minus"></i>
          </div>
          <TypeSelector slideDeck={slideDeck}
            currentSlide={currentSlide} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
