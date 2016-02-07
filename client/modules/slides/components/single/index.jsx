import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        Single
        {JSON.stringify(this.props.data.file)}
      </div>
    );
  }
});
