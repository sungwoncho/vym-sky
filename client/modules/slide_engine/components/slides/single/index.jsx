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
                file={slide.data.file}
                fileKey="file"
                onSetFile={this.handleSetFile}
                editMode={editMode} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleSetFile(fileKey, file) {
    const {slide, slideDeckId, setFile} = this.props;
    setFile(slideDeckId, slide.number, fileKey, file);
  }
});
