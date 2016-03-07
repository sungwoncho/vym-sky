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
