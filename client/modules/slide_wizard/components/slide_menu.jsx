import React from 'react';

import SlideMenuSettings from './slide_menu.settings.jsx';

const SlideMenu = React.createClass({
  render() {
    let {currentSlideNumber} = this.props;

    return (
      <div>
        <div>
          {currentSlideNumber}

          <button href="#" className="btn btn-sm btn-default pull-xs-right" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            <i className="fa fa-cog"></i> Edit
          </button>
        </div>
        <div className="collapse" id="exCollapsingNavbar">
          <SlideMenuSettings handleSlideUpdate={this.handleSlideUpdate} />
        </div>
      </div>
    );
  },

  handleSlideUpdate(modifier) {
    const {updateSlide, currentSlideNumber, slideDeckId} = this.props;

    updateSlide(slideDeckId, currentSlideNumber, modifier);
  }
});

export default SlideMenu;
