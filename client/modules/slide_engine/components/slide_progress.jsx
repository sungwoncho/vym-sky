import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        {this.props.currentSlideNumber} / {this.props.totalSlidesCount}
      </div>
    );
  }
});
