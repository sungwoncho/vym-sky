import React from 'react';

const SlideEngine = React.createClass({
  render() {
    const {slideDeck} = this.props;

    return (
      <div>
        {slideDeck.slides[0].data.title}
        <br />
        <b>currentSlide :</b>
        {slideDeck.currentSlide}
      </div>
    );
  }
});

export default SlideEngine;
