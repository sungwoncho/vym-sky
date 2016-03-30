import React from 'react';

import classNames from 'classnames';

const ToolbarTypeSelector = ({slideDeck, currentSlide, updateSlide}) => {
  function onSlideEdit({type, options}, e) {
    e.preventDefault();
    let isTypeChanged = (currentSlide.type !== type);

    updateSlide(slideDeck._id, currentSlide.number, {type, options}, {resetData: isTypeChanged});
  }

  return (
    <div className="dropdown wz-type-selector wz-toolbar-action">
      <div className="dropdown-toggle"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        Layout ({currentSlide.type}{currentSlide.options.display ? ' ' + currentSlide.options.display : ''})
      </div>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button className={
            classNames('dropdown-item', {active: currentSlide && currentSlide.type === 'single'})
          }
          type="button"
          onClick={onSlideEdit.bind(this, {type: 'single'})}>
          Single
        </button>
        <button className={
            classNames('dropdown-item', {
              active: (currentSlide && currentSlide.type === 'double') &&
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
              active: (currentSlide && currentSlide.type === 'double') &&
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
  );
};

export default ToolbarTypeSelector;
