import React from 'react';

import DiffTable from './diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';

const Section = ({files, section, sectionPosition, onSetSection, onRemoveSection, editMode, height = 'auto', width = 'auto'}) => (
  <div className="slide-section" style={{height: height, width: width}}>
    {
      editMode && !section ?
        <FileList files={files}
          sectionPosition={sectionPosition}
          onSetSection={onSetSection}
          editMode={editMode}
          height={height} />
       :
         section ?
        <DiffTable file={section.data}
          sectionPosition={section.position}
          onRemoveFile={onRemoveSection}
          editMode={editMode}
          height={height} />
        :
          <span></span>
    }
  </div>
 );

export default Section;
