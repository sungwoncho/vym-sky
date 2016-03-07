import React from 'react';

const FileTable = React.createClass({
  getDefaultProps() {
    return {
      height: 'auto'
    };
  },

  render() {
    const {height} = this.props;

    return (
      <table className="table table-hover file-table" style={{height: height}}>
        <tbody>
          <tr onClick={this.goBackToList}>
            <td>
              Go back
            </td>
          </tr>
          {this.props.files.map((file) => {
            return (
              <tr key={file._id} onClick={this.setSection.bind(this, file)}>
                <td>
                  {file.filename}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },

  goBackToList(e) {
    e.preventDefault();

    const {toggleShowFiles} = this.props;
    toggleShowFiles(e);
  },

  setSection(file, e) {
    e.preventDefault();
    const {sectionPosition, onSetSection} = this.props;

    let sectionDoc = {
      position: sectionPosition,
      type: 'file',
      data: file
    };

    onSetSection(sectionDoc, sectionPosition);
  }
});

export default FileTable;
