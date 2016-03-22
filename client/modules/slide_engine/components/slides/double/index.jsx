import React from 'react';
import _ from 'lodash';

import Section from '../../section.jsx';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="slide container-fluid">
          {
            slide.options.display && slide.options.display === 'horizontal' ?
              <Horizontal files={files}
                slide={slide}
                handleSetSection={this.handleSetSection}
                handleRemoveSection={this.handleRemoveSection}
                editMode={editMode} /> :
              <Vertical files={files}
                slide={slide}
                handleSetSection={this.handleSetSection}
                handleRemoveSection={this.handleRemoveSection}
                editMode={editMode} />
          }
      </div>
    );
  },

  handleSetSection(sectionDoc, position) {
    const {slide, slideDeckId, setSection} = this.props;
    setSection(slideDeckId, slide.number, sectionDoc, position);
  },

  handleRemoveSection(position) {
    const {slide, slideDeckId, removeSection} = this.props;
    removeSection(slideDeckId, slide.number, position);
  }
});

const Horizontal = ({files, slide, handleRemoveSection, handleSetSection, editMode}) => (
  <div className="horizontal-double">
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          section={_.find(slide.sections, {position: 1})}
          sectionPosition={1}
          onSetSection={handleSetSection}
          onRemoveSection={handleRemoveSection}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          section={_.find(slide.sections, {position: 2})}
          sectionPosition={2}
          onSetSection={handleSetSection}
          onRemoveSection={handleRemoveSection}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
  </div>
);

const Vertical = ({files, slide, handleRemoveSection, handleSetSection, editMode}) => (
  <div className="vertical-double">
    <div className="row">
      <div className="col-xs-6 section-container">
        <Section files={files}
          section={_.find(slide.sections, {position: 1})}
          sectionPosition={1}
          onSetSection={handleSetSection}
          onRemoveSection={handleRemoveSection}
          editMode={editMode}
          height="750px" />
      </div>
      <div className="col-xs-6 section-container">
         <Section files={files}
          section={_.find(slide.sections, {position: 2})}
          sectionPosition={2}
          onSetSection={handleSetSection}
          onRemoveSection={handleRemoveSection}
          editMode={editMode}
          height="750px"/>
      </div>
    </div>
  </div>
);
