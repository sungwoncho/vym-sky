import React from 'react';

import DiffTable from '../../diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';

export default React.createClass({
  render() {
    const {files, slide} = this.props;
    return (
      <div className="single slide">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {
                slide.data.file ?
                  <DiffTable file={slide.data.file} onRemoveFile={this.handleSetFile} />
                :
                  <FileList files={files} onSetFile={this.handleSetFile} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  },

  handleSetFile(file) {
    const {slide, slideDeckId, updateSlide} = this.props;
    updateSlide(slideDeckId, slide.number, {data: {file: file}});
  }
});
