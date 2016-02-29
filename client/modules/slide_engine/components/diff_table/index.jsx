import React from 'react';

import FileHeader from './file_header.jsx';
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
  componentDidMount() {
    // this.highlightCode();
  },

  render() {
    const {file} = this.props;

    return (
      <div className="dt-container">
        <FileHeader file={file} />
        {this.renderTable()}
      </div>
    );
  },

  renderTable() {
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
  }
});
