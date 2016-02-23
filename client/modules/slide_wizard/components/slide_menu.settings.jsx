import React from 'react';

const SlideMenuSettings = React.createClass({
  render() {
    return (
      <div className="bg-inverse p-a-1">
        <h4>Type</h4>
        <span className="text-muted">Type of the slide</span>
        <select id="slide-type" ref="slideType">
          <option value="">none</option>
          <option value="single">single</option>
        </select>
        <button className="btn btn small btn-success" onClick={this.onSlideEdit}>
          Save
        </button>
      </div>
    );
  },

  onSlideEdit() {
    const {handleSlideUpdate} = this.props;

    let slideType = this.refs.slideType.value;
    handleSlideUpdate({type: slideType});
  }
});

export default SlideMenuSettings;
