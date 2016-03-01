import React from 'react';
import classNames from 'classnames';

class SlideAction extends React.Component {
  constructor(props) {
    super(props);
    this.canRemoveSlide = this.canRemoveSlide.bind(this);
    this.handleAddSlide = this.handleAddSlide.bind(this);
    this.handleRemoveSlide = this.handleRemoveSlide.bind(this);
    this.scrollPreviewToActiveSlide = this.scrollPreviewToActiveSlide;
  }

  render() {
    let removeActionClass = classNames({
      disabled: !this.canRemoveSlide()
    });

    return (
      <ul className="list-unstyled slide-actions">
        <li>
          <a href="#" onClick={this.handleAddSlide}>
            <i className="fa fa-2x fa-plus-square-o"></i>
          </a>
        </li>
        <li>
          <a href="#" className={removeActionClass} onClick={this.handleRemoveSlide}>
            <i className="fa fa-2x fa-minus-square-o"></i>
          </a>
        </li>
        <li></li>
      </ul>
    );
  }

  canRemoveSlide() {
    return !!this.props.currentSlideNumber;
  }

  handleAddSlide(e) {
    e.preventDefault();

    const {addSlide, slideDeck, currentSlideNumber} = this.props;
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

  scrollPreviewToActiveSlide() {
    document.getElementsByClassName('thumbnail-wrapper active')[0].scrollIntoView();
  }

  handleRemoveSlide(e) {
    e.preventDefault();

    if (!this.canRemoveSlide()) {
      return;
    }

    const {removeSlide, slideDeck, currentSlideNumber} = this.props;

    removeSlide(slideDeck._id, currentSlideNumber, () => {
      this.scrollPreviewToActiveSlide();
    });
  }
}

export default SlideAction;
