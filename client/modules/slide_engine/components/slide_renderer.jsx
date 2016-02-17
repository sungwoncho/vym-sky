import React from 'react';

import SingleSlide from './slides/single/index.jsx';
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
    const {slide, scale} = this.props;

    if (slide.number === -1) {
      return (
        <div>
          Deleting...
        </div>
      );
    }

    let ModuleName = ComponentMappings[slide.type];
    let containerStyle = scale ? this.getContainerStyle(scale) : {};

    if (! ModuleName) {
      return <div></div>;
    }

    return (
      <div style={containerStyle}>
        <ModuleName data={slide.data} />
      </div>
    );
  }
});
