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
          {
            slide.type === 'double' ?
              <div>
                <label>
                  <input type="radio" value="vertical" name="display" ref="verticalOption" defaultChecked={slide.options.display !== 'horizontal'}/> Vertical
                </label>
                <label>
                  <input type="radio" value="horizontal" name="display" ref="horizontalOption" defaultChecked={slide.options.display === 'horizontal'}/> Horizontal
                </label>
              </div>
              :
              <span></span>
          }
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
    let isTypeChanged = (slide.type !== slideType);
    let modifier = {type: slideType};

    if (slide.type === 'double') {
      modifier.options = {
        display: this.refs.verticalOption.checked ? 'vertical' : 'horizontal'
      };
    }

    updateSlide(slideDeckId, slide.number, modifier, {resetData: isTypeChanged});
  }
});

export default SlideSettings;
