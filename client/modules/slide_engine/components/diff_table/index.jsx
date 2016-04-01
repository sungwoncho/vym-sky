import React from 'react';

import NormalRow from './normal_row.jsx';
import AddedRow from './added_row.jsx';
import DeletedRow from './deleted_row.jsx';
import ChunkRow from './chunk_row.jsx';

const DiffTable = ({onRemoveFile, section, editMode}) => {
  function removeFile(e) {
    e.preventDefault();
    onRemoveFile(section.position);
  }

  let file = section.data;

  if (!file) {
    return <div>No file</div>;
  } else {
    return (
      <div className="dt-container">
        <div className="file-header">
          {file.filename}
          {
            editMode ?
              <a href="#" className="pull-xs-right" onClick={removeFile}>
                remove file
              </a> :
              <span></span>
          }
        </div>
        <Table file={file} />
      </div>
    );
  }
};

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
