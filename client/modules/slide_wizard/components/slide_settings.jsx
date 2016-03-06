import React from 'react';

const SlideSettings = React.createClass({
  render() {
    const slideTypes = [
      'none',
      'single',
      'double',
      'paragraph'
    ];
    const {showing, slide} = this.props;

    if (showing) {
      return (
        <div className="slide-settings">
          <h4>Type</h4>
          <span className="text-muted">Type of the slide</span>
          <select id="slide-type" ref="slideType" defaultValue={slide.type}>
            {
              slideTypes.map(function (type) {
                return <option value={type} key={type}>{type}</option>;
              })
            }
          </select>
          <button className="btn btn small btn-success" onClick={this.onSlideEdit}>
            Save
          </button>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  },

  onSlideEdit() {
    const {updateSlide, slide, slideDeckId} = this.props;

    let slideType = this.refs.slideType.value;
    let modifier = {type: slideType};

    updateSlide(slideDeckId, slide.number, modifier, {resetData: true});
  }
});

export default SlideSettings;
