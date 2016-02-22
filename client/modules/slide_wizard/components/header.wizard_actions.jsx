import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  render() {
    let removeActionClass = classNames({
      'nav-link': true,
      disabled: !this.canRemoveSlide()
    });

    return (
      <div className="nav navbar-nav wizard-actions">
        <li className="nav-item wizard-action">
          <a href="#" className="nav-link" onClick={this.addSlide}>
            <i className="fa fa-plus"></i>
          </a>
        </li>
        <li className="nav-item wizard-action">
          <a href="#" className={removeActionClass} onClick={this.removeSlide}>
            <i className="fa fa-minus"></i>
          </a>
        </li>
      </div>
    );
  },

  canRemoveSlide() {
    return !! this.props.currentSlideNumber;
  },

  scrollPreviewToActiveSlide() {
    document.getElementsByClassName('thumbnail-wrapper active')[0].scrollIntoView();
  },

  addSlide(e) {
    e.preventDefault();
    const {addSlide, slideDeck, currentSlideNumber} = this.props;

    addSlide(slideDeck._id, currentSlideNumber + 1, () => {
      this.scrollPreviewToActiveSlide();
    });
  },

  removeSlide(e) {
    e.preventDefault();
    if (!this.canRemoveSlide()) {
      return;
    }

    const {removeSlide, slideDeck, currentSlideNumber} = this.props;

    removeSlide(slideDeck._id, currentSlideNumber, () => {
      this.scrollPreviewToActiveSlide();
    });
  }
});
