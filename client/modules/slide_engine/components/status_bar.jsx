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
    <div className="se-status-bar">
      <div className="current-progress">
        {currentSlideNumber} / {totalSlidesCount}
      </div>
      <div className="actions">
        <button onClick={toNextSlide}>next</button>
        <button onClick={toPrevSlide}>prev</button>
      </div>
    </div>
  );
};

export default StatusBar;
