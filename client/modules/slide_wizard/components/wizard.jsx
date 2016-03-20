import React from 'react';

import Preview from './preview.jsx';
import SlideMenu from './slide_menu.jsx';
import Slide from '/client/modules/slide_engine/components/slide.jsx';
import SlideAction from './slide_action.jsx';
import SlideSettings from './slide_settings.jsx';
import Header from './header.jsx';

export default React.createClass({
  componentDidMount() {
    const {slideDeck, getFiles} = this.props;
    getFiles(slideDeck.repo.ownerName, slideDeck.repo.name, slideDeck.prNumber);
    document.body.classList.add('no-overscroll');
  },

  getInitialState() {
    return {
      showSlideSettings: false
    };
  },

  render() {
    const {slideDeck, files, showSlide, currentSlideNumber, addSlide, removeSlide, reorderSlide, updateSlide} = this.props;
    const currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

    return (
      <div>
        <Header slideDeck={slideDeck} />
        <div className="wizard container-fluid">
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
                    handleToggleSetting={this.handleToggleSetting} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 slide-settings-container">
                  <SlideSettings slide={currentSlide}
                    showing={this.state.showSlideSettings}
                    updateSlide={updateSlide}
                    slideDeckId={slideDeck._id} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <Slide editMode={true}
                    slide={currentSlide}
                    scale={1.2}
                    files={files}
                    slideDeckId={slideDeck._id}/>
                </div>
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
  },

  handleToggleSetting() {
    this.setState({showSlideSettings: !this.state.showSlideSettings});
  }
});
