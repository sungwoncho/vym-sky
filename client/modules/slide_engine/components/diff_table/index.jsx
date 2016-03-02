import React from 'react';

import NormalRow from './normal_row.jsx';
import AddedRow from './added_row.jsx';
import DeletedRow from './deleted_row.jsx';
import ChunkRow from './chunk_row.jsx';

let RowMappings = {
  normal: NormalRow,
  del: DeletedRow,
  add: AddedRow,
  chunk: ChunkRow
};

export default React.createClass({
  getDefaultProps() {
    return {
      height: 'auto',
      width: 'auto',
      fileKey: 'file'
    };
  },

  render() {
    const {file, height, width, editMode} = this.props;

    if (! file) {
      return <div>No file</div>;
    } else {
      return (
        <div className="dt-container" style={{height: height, width: width}}>
          <div className="file-header">
            {file.filename}
            {
              editMode ?
                <a href="#" className="pull-xs-right" onClick={this.removeFile}>remove file</a>
              :
                <span></span>
            }

          </div>
          {this.renderTable()}
        </div>
      );
    }
  },

  renderTable() {
    let {file} = this.props;

    return (
      <div className="dt-wrapper">
        <table className="diff-table">
          <tbody>
            {this.renderChunk()}
          </tbody>
        </table>
      </div>
    );
  },

  renderChunk() {
    const {file} = this.props;

    return file.patch.map((change, index) => {
      let RowComponent = RowMappings[change.type];
      return <RowComponent change={change} key={index} />;
    });
  },

  removeFile(e) {
    e.preventDefault();

    const {onRemoveFile, fileKey} = this.props;
    onRemoveFile(fileKey, null);
  }
});
