import React from 'react';

import Section from '../../section.jsx';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="single slide">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <Section files={files}
                section={_.find(slide.sections, {position: 1})}
                sectionPosition={1}
                onSetSection={this.handleSetSection}
                onRemoveSection={this.handleRemoveSection}
                editMode={editMode} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleSetSection(sectionDoc, position) {
    const {slide, slideDeckId, setSection} = this.props;
    setSection(slideDeckId, slide.number, sectionDoc, position);
  },

  handleRemoveSection(position) {
    const {slide, slideDeckId, removeSection} = this.props;
    console.log(position);
    removeSection(slideDeckId, slide.number, position);
  }
});
