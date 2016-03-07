import React from 'react';

import Section from '../../section.jsx';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="single slide">
        <div className="container-fluid">
          {
            slide.options.display && slide.options.display === 'horizontal'?
              <Horizontal files={files}
                slide={slide}
                handleSetSection={this.handleSetSection}
                editMode={editMode} />
            :
              <Vertical files={files}
                slide={slide}
                handleSetSection={this.handleSetSection}
                editMode={editMode} />
          }
        </div>
      </div>
    );
  },

  handleSetSection(sectionDoc, position) {
    const {slide, slideDeckId, setSection} = this.props;
    setSection(slideDeckId, slide.number, sectionDoc, position);
  }
});

const Horizontal = ({files, slide, handleSetSection, editMode}) => (
  <div className="horizontal-double">
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          section={_.find(slide.sections, {position: 1})}
          onSetSection={handleSetSection}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          section={_.find(slide.sections, {position: 2})}
          onSetSection={handleSetSection}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
  </div>
);

const Vertical = ({files, slide, handleSetSection, editMode}) => (
  <div className="row vertical-double">
    <div className="col-xs-6 section-container">
      <Section files={files}
        section={_.find(slide.sections, {position: 1})}
        onSetSection={handleSetSection}
        editMode={editMode}
        height="750px" />
    </div>
    <div className="col-xs-6 section-container">
       <Section files={files}
        section={_.find(slide.sections, {position: 2})}
        onSetSection={handleSetSection}
        editMode={editMode}
        height="750px"/>
    </div>
  </div>
);
