import React from 'react';

const FileTable = React.createClass({
  render() {
    return (
      <table className="table table-hover file-table">
        <tbody>
          <tr onClick={this.goBackToList}>
            <td>
              Go back
            </td>
          </tr>
          {this.props.files.map((file) => {
            return (
              <tr key={file._id} onClick={this.setFile.bind(this, file)}>
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

  setFile(file, e) {
    e.preventDefault();

    const {fileKey, onSetFile} = this.props;
    onSetFile(fileKey, file);
  }
});

export default FileTable;
