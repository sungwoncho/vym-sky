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
              <div className="row">
                <div className="col-xs-6">
                  {
                    slide.data.fileOne ?
                      <DiffTable file={slide.data.fileOne}
                        fileKey="fileOne"
                        onRemoveFile={this.handleSetFile} />
                    :
                      <FileList files={files}
                        fileKey="fileOne"
                        onSetFile={this.handleSetFile} />
                  }
                </div>
                <div className="col-xs-6">
                  {
                    slide.data.fileTwo ?
                      <DiffTable file={slide.data.fileTwo}
                        fileKey="fileTwo"
                        onRemoveFile={this.handleSetFile} />
                    :
                      <FileList files={files}
                        fileKey="fileTwo"
                        onSetFile={this.handleSetFile} />
                  }
                </div>
              </div>
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
