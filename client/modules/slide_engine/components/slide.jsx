import React from 'react';

import SingleSlide from '../containers/slides/single';
import CompareSlide from './slides/compare/index.jsx';
import DoubleVerticalSlide from '../containers/slides/double_vertical';

let ComponentMappings = {
  single: SingleSlide,
  compare: CompareSlide,
  double_vertical: DoubleVerticalSlide
};

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
  if (! slide) {
    return <div>No slide, jose</div>;
  }

  let ModuleName = ComponentMappings[slide.type];
  let containerStyle = getContainerStyle(scale);

  if (! ModuleName) {
    return <div>Invalid slide type {slide.type}</div>;
  }

  return (
    <div style={containerStyle}>
      <ModuleName slide={slide}
        editMode={editMode}
        slideDeckId={slideDeckId}
        files={files} />
    </div>
  );
}

Slide.propTypes = {
  scale: React.PropTypes.number,
  slide: React.PropTypes.object.isRequired
};

export default Slide;
