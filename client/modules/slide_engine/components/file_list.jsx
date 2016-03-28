import React from 'react';
import _ from 'lodash';

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.removeSection = this.removeSection.bind(this);
    this.state = {searchTerm: ''};
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  removeSection(e) {
    e.preventDefault();

    let {sectionPosition, onRemoveSection} = this.props;
    onRemoveSection(sectionPosition);
  }

  updateSearchTerm() {
    this.setState({searchTerm: this.refs.fileSearchTerm.value});
  }

  render() {
    const {files, sectionPosition, onSetSection} = this.props;

    return (
      <div className="file-list-container">
        <div className="row file-list-action">
          <div className="col-xs-11">
            <input type="text"
              className="form-control"
              placeholder="Find in pull request"
              ref="fileSearchTerm"
              onChange={this.updateSearchTerm} />
          </div>
          <div className="col-xs-1">
            <a href="#"
              onClick={this.removeSection}
              className="pull-xs-right remove-section-btn">
              <i className="fa fa-close"></i>
            </a>
          </div>
        </div>
        <table className="tree-browser table table-hover">
          <tbody>
            {
              files.filter(file => {
                let searchRegex = new RegExp(_.escapeRegExp(this.state.searchTerm), 'i');
                return searchRegex.test(file.filename);
              })
              .map(function (file) {
                return <FileRow file={file}
                  sectionPosition={sectionPosition}
                  onSetSection={onSetSection}
                  key={file._id} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

FileList.defaultProps = {sectionPosition: 1};

const FileRow = ({file, sectionPosition, onSetSection}) => {
  function setSection(e) {
    e.preventDefault();

    let sectionDoc = {
      position: sectionPosition,
      type: 'file',
      data: file
    };

    onSetSection(sectionDoc, sectionPosition);
  }

  return (
    <tr key={file._id}
      onClick={setSection}
      className="file-row">
      <td>
        {file.filename}
      </td>
    </tr>
  );
};

export default FileList;
