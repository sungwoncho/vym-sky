import React from 'react';

const StatusBar = ({currentSlideNumber, totalSlidesCount, slideDeck, nextSlide, prevSlide}) => {
  function toNextSlide(e) {
    e.preventDefault();
    nextSlide(slideDeck._id);
  }

  function toPrevSlide(e) {
    e.preventDefault();
    prevSlide(slideDeck._id);
  }

  return (
    <div className="pres-status-bar">
      <div className="navgiation">
        <button onClick={toPrevSlide} className="btn btn-sm btn-secondary">
          <i className="fa fa-caret-left"></i>
        </button>
        <div className="current-progress">
          {currentSlideNumber} / {totalSlidesCount}
        </div>
        <button onClick={toNextSlide} className="btn btn-sm btn-secondary">
          <i className="fa fa-caret-right"></i>
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
