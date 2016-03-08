import React from 'react';

import DiffTable from './diff_table/index.jsx';
import FileList from '/client/modules/slide_engine/components/file_list.jsx';


const Section = ({files, section, sectionPosition, onSetSection, onRemoveSection, editMode, height = 'auto', width = 'auto'}) => {
  let SectionComponent;

  if (section) {
    SectionComponent = SectionMapping[section.type];
  }

  return (
    <div className="slide-section" style={{height: height, width: width}}>
      {
        !section ?
          <EmptySection editMode={editMode}
            sectionPosition={sectionPosition}
            onSetSection={onSetSection} />
        :
          <SectionComponent editMode={editMode}
            section={section}
            onSetSection={onSetSection}
            onRemoveSection={onRemoveSection}
            files={files} 
            height={height} 
            width={width} />
      }
    </div>
  );
};

const EmptySection = ({sectionPosition, onSetSection, editMode}) => {
  function setSection(type, e) {
    e.preventDefault();
    let sectionDoc = {
      type: type
    };

    onSetSection(sectionDoc, sectionPosition);
  }

  return (
    <div>
      {
        editMode ?
          <div>
            <a href="#" onClick={setSection.bind(this, 'file')}>Add file</a><br/>
            <a href="#" onClick={setSection.bind(this, 'text')}>Add text</a>
          </div>
        :
          <h1>Empty section</h1>
      }
    </div>
  );
};

const FileSection = ({files, section, onRemoveSection, onSetSection, editMode, height, width}) => {
  return (
    <div>
      {
        editMode ?
          <EditFileSection files={files}
            section={section}
            onSetSection={onSetSection} 
            onRemoveSection={onRemoveSection}
            height={height} />
        :
          <DiffTable section={section}
            onRemoveFile={onRemoveSection}
            height={height} />
      }
    </div>
  );
};

const EditFileSection = ({files, section, onSetSection, onRemoveSection, height}) => {
  let file = section.data;

  if (file) {
    return (
      <DiffTable section={section}
        onRemoveFile={onRemoveSection}
        height={height}
        editMode={true} />
    );
  } else {
    return (
      <FileList files={files}
        sectionPosition={section.position}
        onSetSection={onSetSection}
        height={height} />
    );
  }
};

const TextSection = ({section, onSetSection, onRemoveSection, editMode}) => {
  function removeSection(position, e) {
    e.preventDefault();
    onRemoveSection(position);
  }

  return (
    <div>
      {
        editMode ?
          <div>
            <a href="#" onClick={removeSection.bind(this, section.position)}>
              Remove section
            </a>
            todo: editor (md)
          </div>
         :
           <div>
             todo: text content
           </div>
      }
    </div>
  );
};

// Maps section types to corresponding components
const SectionMapping = {
  'file': FileSection,
  'text': TextSection
};

export default Section;