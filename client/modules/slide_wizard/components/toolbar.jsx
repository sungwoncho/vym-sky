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
          <ul className="wz-toolbar-action-list">
            <li className="wz-toolbar-action">
              <a href="#" onClick={handleAddSlide}>
                 <i className="fa fa-plus"></i>
              </a>
            </li>
            <li className="wz-toolbar-action">
              <a href="#" onClick={handleRemoveSlide}>
                 <i className="fa fa-minus"></i>
              </a>
            </li>
            <li className="wz-toolbar-action">
              <TypeSelector slideDeck={slideDeck}
                currentSlide={currentSlide} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
