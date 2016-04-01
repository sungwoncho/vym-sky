import React from 'react';

import NormalRow from './normal_row.jsx';
import AddedRow from './added_row.jsx';
import DeletedRow from './deleted_row.jsx';
import ChunkRow from './chunk_row.jsx';
import {highlightSyntax} from '/client/modules/slide_engine/libs/highlighter';

class DiffTable extends React.Component {
  constructor(props) {
    super(props);
    this.file = props.section.data;
  }

  componentDidMount() {
    this.file.patch = highlightSyntax(this.file.patch);
  }

  removeFile(e) {
    const {onRemoveFile, section} = this.props;
    e.preventDefault();
    onRemoveFile(section.position);
  }

  render() {
    const {section, editMode} = this.props;
    let file = this.file;

    if (!file) {
      return <div>No file</div>;
    } else {
      return (
        <div className="dt-container">
          <div className="file-header">
            {file.filename}
            {
              editMode ?
                <a href="#" className="pull-xs-right" onClick={this.removeFile.bind(this)}>
                  remove file
                </a> :
                <span></span>
            }
          </div>
          <Table file={file} />
        </div>
      );
    }
  }
}

const Table = ({file}) => (
  <div className="dt-wrapper">
    <table className="diff-table">
      <Chunk file={file} />
    </table>
  </div>
);

const Chunk = ({file}) => {
  return (
    <tbody>
      {
        file.patch.map((change, index) => {
          let RowComponent = RowMappings[change.type];
          return <RowComponent change={change} key={index} />;
        })
      }
    </tbody>
  );
};

let RowMappings = {
  normal: NormalRow,
  del: DeletedRow,
  add: AddedRow,
  chunk: ChunkRow
};

export default DiffTable;
