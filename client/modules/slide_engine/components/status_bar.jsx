import React from 'react';

const StatusBar = ({
  currentSlideNumber,
  totalSlidesCount,
  slideDeck,
  currentUser,
  nextSlide,
  prevSlide
}) => {
  function canNavigate() {
    return currentUser._id === slideDeck.ownerId;
  }

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
        {
          canNavigate() ?
          <button onClick={toPrevSlide} className="btn btn-sm btn-secondary">
            <i className="fa fa-caret-left"></i>
          </button> :
          <span></span>
        }
        <div className="current-progress">
          {currentSlideNumber} / {totalSlidesCount}
        </div>
        {
          canNavigate() ?
          <button onClick={toNextSlide} className="btn btn-sm btn-secondary">
            <i className="fa fa-caret-right"></i>
          </button> :
          <span></span>
        }
      </div>
    </div>
  );
};

export default StatusBar;
