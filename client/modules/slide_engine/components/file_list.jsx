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
      sectionPosition: 1,
      height: 'auto'
    };
  },

  render() {
    const {files, height} = this.props;

    return (
      <div className="section-file" style={{lineHeight: height}}>
        {
          this.state.showingFiles ?
            <FileTable files={files}
              onSetSection={this.props.onSetSection}
              sectionPosition={this.props.sectionPosition}
              toggleShowFiles={this.toggleShowFiles}
              height={height} />
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
