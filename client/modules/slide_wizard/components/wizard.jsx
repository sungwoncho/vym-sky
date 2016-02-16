import React from 'react';

import Preview from './preview.jsx';

export default React.createClass({
  render() {
    const {slideDeck} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 preview-container">
            <Preview slides={slideDeck.slides} />
          </div>
          <div className="col-sm-10">
            content
          </div>
        </div>
      </div>
    );
  }
});
