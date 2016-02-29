import React from 'react';

const FileTable = React.createClass({
  render() {
    return (
      <table>
        <tbody>
          {this.props.files.map((file) => {
            return (
              <tr key={file._id}>
                <td>
                  <a href="#" onClick={this.setFile.bind(this, file)}>
                    {file.filename}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },

  setFile(file, e) {
    e.preventDefault();

    const {onSetFile} = this.props;
    onSetFile(file);
  }
});

export default FileTable;
