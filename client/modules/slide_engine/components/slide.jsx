import React from 'react';

import SingleSlide from '../containers/slides/single';
import DoubleSlide from '../containers/slides/double';
import ParagraphSlide from '../containers/slides/paragraph';
import InvalidSlide from './slides/errors/invalid.jsx';
import SlideNotFound from './slides/errors/not_found.jsx';

function getSlideComponent(slide) {
  let ComponentMappings = {
    single: SingleSlide,
    double: DoubleSlide,
    paragraph: ParagraphSlide
  };

  if (!slide) {
    return SlideNotFound;
  }

  return ComponentMappings[slide.type] || InvalidSlide;
}

function getContainerStyle(scale) {
  if (!scale) {
    return {};
  }

  return {
    width: `${100 * scale}%`,
    height: `${30 * scale}px`,
    transform: `scale(${1 / scale})`,
    transformOrigin: '0 0 0'
  };
}

// files, slideDeckId are only needed if editMode
const Slide = ({slide, scale, editMode, files, slideDeckId}) => {
  let ModuleName = getSlideComponent(slide);
  let containerStyle = getContainerStyle(scale);

  return (
    <div className="se-slide-container" style={containerStyle}>
      <ModuleName slide={slide}
        editMode={editMode}
        slideDeckId={slideDeckId}
        files={files} />
    </div>
  );
};

Slide.propTypes = {
  scale: React.PropTypes.number,
  slide: React.PropTypes.object.isRequired
};

export default Slide;
