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
              fileKey={this.props.fileKey} />
          :
            <a href="#" onClick={this.handleShowFiles}>click here to add file</a>
        }

      </div>
    );
  },

  handleShowFiles(e) {
    e.preventDefault();
    this.setState({showingFiles: true});
  }
});
