import React from 'react';

import DiffTable from '../../diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';

export default React.createClass({
  render() {
    const {files, slide, editMode} = this.props;
    return (
      <div className="single slide">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                editMode && !slide.data.file ?
                  <FileList files={files} onSetFile={this.handleSetFile} />
                :
                  <DiffTable file={slide.data.file}
                    fileKey="file"
                    onRemoveFile={this.handleSetFile}
                    height="700px"
                    editMode={editMode} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleSetFile(fileKey, file) {
    const {slide, slideDeckId, updateSlide} = this.props;
    let modifier = {data: {}};
    modifier.data[fileKey] = file;

    updateSlide(slideDeckId, slide.number, modifier);
  }
});
