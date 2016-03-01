import React from 'react';

import Preview from './preview.jsx';
import SlideMenu from './slide_menu.jsx';
import SlideRenderer from '/client/modules/slide_engine/components/slide_renderer.jsx';
import SlideAction from './slide_action.jsx';

export default React.createClass({
  componentDidMount() {
    const {slideDeck, getFiles} = this.props;

    getFiles(slideDeck.prId);
  },

  render() {
    const {slideDeck, files, showSlide, currentSlideNumber, addSlide, removeSlide, reorderSlide, updateSlide} = this.props;
    const currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 preview-section">
            <div className="row">
              <div className="col-sm-12 action-bar">
                <SlideAction addSlide={addSlide}
                  removeSlide={removeSlide}
                  slideDeck={slideDeck}
                  currentSlideNumber={currentSlideNumber} />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 preview-container">
                <Preview slides={slideDeck.slides}
                  showSlide={showSlide}
                  onThumbnailMove={this.onThumbnailMove}
                  currentSlideNumber={currentSlideNumber}
                  ctx={this.props.context} />
              </div>
            </div>
          </div>
          <div className="col-sm-10 slide-container">
            <div className="row">
              <div className="col-sm-12 slide-menu-bar">
                <SlideMenu currentSlide={currentSlide}
                  currentSlideNumber={currentSlideNumber}
                  slideDeckId={slideDeck._id}
                  updateSlide={updateSlide} />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <SlideRenderer editMode={true}
                  slide={currentSlide}
                  scale={1.2}
                  files={files}
                  slideDeckId={slideDeck._id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  onThumbnailMove(fromSlideNumber, toSlideNumber) {
    if (fromSlideNumber === toSlideNumber) {
      return;
    }

    const {slideDeck, reorderSlide} = this.props;

    reorderSlide(slideDeck._id, fromSlideNumber, toSlideNumber);
  }
});
