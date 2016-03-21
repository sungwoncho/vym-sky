import React from 'react';
import classNames from 'classnames';

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

  function onSlideEdit({type, options}, e) {
    e.preventDefault();
    let isTypeChanged = (currentSlide.type !== type);

    updateSlide(slideDeck._id, currentSlideNumber, {type, options}, {resetData: isTypeChanged});
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
              <a href="#">
                <div className="dropdown wz-type-selector">
                  <button className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Type
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className={
                        classNames('dropdown-item', {active: currentSlide.type === 'single'})
                      }
                      type="button"
                      onClick={onSlideEdit.bind(this, {type: 'single'})}>
                      Single
                    </button>
                    <button className={
                        classNames('dropdown-item', {
                          active: (currentSlide.type === 'double') &&
                                  (currentSlide.options && currentSlide.options.display === 'vertical')
                        })
                      }
                      type="button"
                      onClick={
                        onSlideEdit.bind(this, {type: 'double', options: {display: 'vertical'}})
                      }>
                      Double (vertical)
                    </button>
                    <button className={
                        classNames('dropdown-item', {
                          active: (currentSlide.type === 'double') &&
                                  (currentSlide.options && currentSlide.options.display === 'horizontal')
                        })
                      }
                      type="button"
                      onClick={
                        onSlideEdit.bind(this, {type: 'double', options: {display: 'horizontal'}})
                      }>
                      Double (horizontal)
                    </button>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
