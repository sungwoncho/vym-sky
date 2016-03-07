import React from 'react';

import Section from '../../section.jsx';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="single slide">
        <div className="container-fluid">
          {
            slide.option.horizontal ?
              <Horizontal files={files}
                slide={slide}
                handleSetFile={this.handleSetFile}
                editMode={editMode} />
            :
              <Vertical files={files}
                slide={slide}
                handleSetFile={this.handleSetFile}
                editMode={editMode} />
          }
        </div>
      </div>
    );
  },

  handleSetFile(fileKey, file) {
    const {slide, slideDeckId, setFile} = this.props;
    setFile(slideDeckId, slide.number, fileKey, file);
 }
});

const Horizontal = ({files, slide, handleSetFile, editMode}) => (
  <div className="horizontal-double">
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          file={slide.data.fileOne}
          fileKey="fileOne"
          onSetFile={handleSetFile}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
    <div className="row section-container">
      <div className="col-xs-12">
        <Section files={files}
          file={slide.data.fileOne}
          fileKey="fileOne"
          onSetFile={handleSetFile}
          editMode={editMode}
          height="340px"/>
      </div>
    </div>
  </div>
);

const Vertical = ({files, slide, handleSetFile, editMode}) => (
  <div className="row vertical-double">
    <div className="col-xs-6 section-container">
      <Section files={files}
        file={slide.data.fileOne}
        fileKey="fileOne"
        onSetFile={handleSetFile}
        editMode={editMode}
        height="750px" />
    </div>
    <div className="col-xs-6 section-container">
       <Section files={files}
        file={slide.data.fileTwo}
        fileKey="fileTwo"
        onSetFile={handleSetFile}
        editMode={editMode}
        height="750px"/>
    </div>
  </div>
);
