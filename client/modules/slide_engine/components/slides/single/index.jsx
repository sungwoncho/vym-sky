import React from 'react';
import _ from 'lodash';

import Section from '/client/modules/slide_engine/containers/section';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="single slide container-fluid">
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
