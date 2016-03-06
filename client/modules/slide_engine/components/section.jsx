import React from 'react';

import DiffTable from './diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';

const Section = ({files, file, fileKey, onSetFile, editMode}) => (
  editMode && !file ?
    <FileList files={files}
      fileKey={fileKey}
      onSetFile={onSetFile}
      editMode={editMode} />
   :
    <DiffTable file={file}
      fileKey={fileKey}
      onRemoveFile={onSetFile}
      editMode={editMode} />
 );

export default Section;
