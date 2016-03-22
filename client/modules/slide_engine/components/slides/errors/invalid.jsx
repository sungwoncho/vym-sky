import React from 'react';

const InvalidSlide = ({slide}) => {
  return (
    <div className="slide">
      Invalid slide type {slide.type}
    </div>
  );
};

export default InvalidSlide;
