import React from 'react';

import FileTable from './file_table.jsx';

export default React.createClass({
  getInitialState() {
    return {
      showingFiles: false,
    };
  },

  getDefaultProps() {
    return {
      fileKey: 'file'
    };
  },

  render() {
    const {files, slideDeckId} = this.props;

    return (
      <div>
        {
          this.state.showingFiles ?
            <FileTable files={files}
              onSetFile={this.props.onSetFile}
              fileKey={this.props.fileKey}
              toggleShowFiles={this.toggleShowFiles} />
          :
            <a href="#" onClick={this.toggleShowFiles}>
              <div className="add-file-box">
                click here to add file
              </div>
            </a>
        }

      </div>
    );
  },

  toggleShowFiles(e) {
    e.preventDefault();
    this.setState({showingFiles: !this.state.showingFiles});
  }
});
