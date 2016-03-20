import React from 'react';

const Toolbar = ({addSlide, slideDeck, currentSlideNumber}) => {
  function handleAddSlide(e) {
    e.preventDefault();
    let targetSlideNumber;

    if (currentSlideNumber) {
      targetSlideNumber = currentSlideNumber + 1;
    } else {
      targetSlideNumber = 1;
    }

    addSlide(slideDeck._id, targetSlideNumber, () => {
      this.scrollPreviewToActiveSlide();
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
              <a href="#">
                Change type
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
