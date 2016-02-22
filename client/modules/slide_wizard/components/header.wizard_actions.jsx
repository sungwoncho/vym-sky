import React from 'react';

export default React.createClass({
  render() {
    return (
      <div className="nav navbar-nav wizard-actions">
        <li className="nav-item wizard-action">
          <a href="#" className="nav-link" onClick={this.addSlide}>
            <i className="fa fa-plus"></i>
          </a>
        </li>
        <li className="nav-item wizard-action">
          <a href="#" className="nav-link" onClick={this.removeSlide}>
            <i className="fa fa-minus"></i>
          </a>
        </li>
      </div>
    );
  },

  addSlide(e) {
    e.preventDefault();
    const {addSlide, slideDeck, currentSlideNumber} = this.props;

    addSlide(slideDeck._id, currentSlideNumber + 1);
  },

  removeSlide(e) {
    e.preventDefault();
    const {removeSlide, slideDeck, currentSlideNumber} = this.props;

    removeSlide(slideDeck._id, currentSlideNumber);
  }
});
