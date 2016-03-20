import React from 'react';

import Preview from './preview.jsx';
import Slide from '/client/modules/slide_engine/components/slide.jsx';
import Header from './header.jsx';
import Toolbar from '../containers/toolbar';

class Wizard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {slideDeck, getFiles} = this.props;
    getFiles(slideDeck.repo.ownerName, slideDeck.repo.name, slideDeck.prNumber);
    document.body.classList.add('no-overscroll');
    this.state = {showSlideSettings: false};
  }

  render() {
    const {slideDeck, files, showSlide, currentSlideNumber, addSlide, removeSlide, reorderSlide, updateSlide} = this.props;
    const currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

    return (
      <div className="wz-layout">
        <div className="wz-topbar">
          <Header slideDeck={slideDeck} />
          <Toolbar />
        </div>
        <div className="wz-content">
          <div className="container-fluid wz-content-container">
            <div className="row wz-content-box">
              <div className="col-sm-2 preview-section">
                <Preview slides={slideDeck.slides}
                  showSlide={showSlide}
                  onThumbnailMove={this.onThumbnailMove}
                  currentSlideNumber={currentSlideNumber}
                  ctx={this.props.context} />
              </div>
              <div className="col-sm-10 slide-container">
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
    );
  }

  onThumbnailMove(fromSlideNumber, toSlideNumber) {
    if (fromSlideNumber === toSlideNumber) {
      return;
    }

    const {slideDeck, reorderSlide} = this.props;

    reorderSlide(slideDeck._id, fromSlideNumber, toSlideNumber);
  }

  handleToggleSetting() {
    this.setState({showSlideSettings: !this.state.showSlideSettings});
  }
}

export default Wizard;
