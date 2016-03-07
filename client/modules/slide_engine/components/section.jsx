import React from 'react';

import DiffTable from './diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';

const Section = ({files, file, fileKey, onSetFile, editMode, height = 'auto', width = 'auto'}) => (
  <div className="slide-section" style={{height: height, width: width}}>
    {
      editMode && !file ?
        <FileList files={files}
          fileKey={fileKey}
          onSetFile={onSetFile}
          editMode={editMode}
          height={height} />
       :
        <DiffTable file={file}
          fileKey={fileKey}
          onRemoveFile={onSetFile}
          editMode={editMode}
          height={height} />
    }
  </div>
 );

export default Section;
