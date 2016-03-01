import React from 'react';

import SingleSlide from '../containers/slides/single';
import CompareSlide from './slides/compare/index.jsx';

let ComponentMappings = {
  single: SingleSlide,
  compare: CompareSlide
};

export default React.createClass({
  propTypes: {
    scale: React.PropTypes.number,
    slide: React.PropTypes.object.isRequired
  },

  getContainerStyle(scale) {
    return {
      width: `${100 * scale}%`,
      height: `${30 * scale}px`,
      transform: `scale(${1 / scale})`,
      transformOrigin: '0 0 0'
    };
  },

  render() {
    // files, slideDeckId are only needed if editMode
    const {slide, scale, editMode, files, slideDeckId} = this.props;

    if (! slide) {
      return <div>No slide, jose</div>;
    }

    let ModuleName = ComponentMappings[slide.type];
    let containerStyle = scale ? this.getContainerStyle(scale) : {};

    if (! ModuleName) {
      return <div></div>;
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
});
