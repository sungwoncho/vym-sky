import React from 'react';

export default React.createClass({

  render() {
    const {file} = this.props;

    return (
      <div className="file-header">
        {file.filename}
      </div>
    );
  }
});
