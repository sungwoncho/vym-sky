import React from 'react';

const SlideMenu = React.createClass({
  render() {
    let {currentSlideNumber, currentSlide} = this.props;

    return (
      <div>
        <div>
          {currentSlideNumber}

          <button href="#" className="btn btn-sm btn-default pull-xs-right" onClick={this.toggleSlideSetting}>
            <i className="fa fa-cog"></i> Edit
          </button>
        </div>
      </div>
    );
  },

  toggleSlideSetting() {
    const {handleToggleSetting} = this.props;

    handleToggleSetting();
  }
});

export default SlideMenu;
