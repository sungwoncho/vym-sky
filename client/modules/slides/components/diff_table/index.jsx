import React from 'react';

import FileHeader from './file_header.jsx';
import NormalRow from './normal_row.jsx';
import AddedRow from './added_row.jsx';
import DeletedRow from './deleted_row.jsx';

let RowMappings = {
  normal: NormalRow,
  del: DeletedRow,
  add: AddedRow
};

export default React.createClass({
  componentDidMount() {
    this.highlightCode();
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
    const {file} = this.props;

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

    return file.chunks.map((chunk, index) => {
      return ([
        this.renderCodeBlock(chunk.content),
        this.renderRows(chunk.changes)
      ]);
    });
  },

  renderCodeBlock(content) {
    return (
      <tr>
        <td className="dt-no-num" colSpan="2"></td>
        <td className="dt-code-block">{content}</td>
      </tr>
    );
  },

  renderRows(changes) {
    return changes.map(function (change, index) {
      let RowComponent = RowMappings[change.type];
      return <RowComponent change={change} key={index} />;
    });
  },

  highlightCode() {

  }
});
