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


// files, slideDeckId are only needed if editMode
const Slide = ({slide, editMode, files, slideDeckId}) => {
  let ModuleName = getSlideComponent(slide);

  return (
    <ModuleName slide={slide}
      editMode={editMode}
      slideDeckId={slideDeckId}
      files={files} />
  );
};

Slide.propTypes = {
  scale: React.PropTypes.number,
  slide: React.PropTypes.object.isRequired
};

export default Slide;
