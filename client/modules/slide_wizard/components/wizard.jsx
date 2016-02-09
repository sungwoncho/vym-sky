import React from 'react';

export default React.createClass({
  render() {
    const {slideDeck} = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9">
            {slideDeck.title}
          </div>
          <div className="col-sm-3">

          </div>
        </div>
      </div>
    );
  }
});
