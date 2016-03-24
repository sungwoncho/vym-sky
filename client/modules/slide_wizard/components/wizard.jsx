import React from 'react';

import Preview from './preview.jsx';
import Slide from '/client/modules/slide_engine/components/slide.jsx';
import Header from './header.jsx';
import Toolbar from '../containers/toolbar';
import PermissionDenied from '/client/modules/core/components/permission_denied.jsx';

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showSlideSettings: false};
    this.onThumbnailMove = this.onThumbnailMove.bind(this);
  }

  componentDidMount() {
    const {slideDeck, getFiles, getSinglePullRequest} = this.props;
    getFiles(slideDeck.repo.ownerName, slideDeck.repo.name, slideDeck.prNumber);
    getSinglePullRequest(slideDeck.repo.ownerName, slideDeck.repo.name, slideDeck.prNumber);
    document.body.classList.add('no-overscroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('no-overscroll');
  }

  render() {
    const {slideDeck, files, showSlide, currentSlideNumber, pullRequest, currentUser} = this.props;
    const currentSlide = slideDeck.getSlideByNumber(currentSlideNumber);

    return (
      <div>
        {
          slideDeck.ownerId === currentUser._id ?
          <div className="wz-layout">
            <div className="wz-topbar">
              <Header slideDeck={slideDeck} pullRequest={pullRequest} />
              <Toolbar slideDeck={slideDeck} currentSlideNumber={currentSlideNumber} />
            </div>
            <div className="wz-content">
              <div className="container-fluid wz-content-container">
                <div className="row wz-content-box">
                  <div className="col-md-2 col-sm-3 col-xs-12 preview-section">
                    <Preview slides={slideDeck.slides}
                      showSlide={showSlide}
                      onThumbnailMove={this.onThumbnailMove}
                      currentSlideNumber={currentSlideNumber}
                      ctx={this.props.context} />
                  </div>
                  <div className="col-md-10 col-sm-9 col-xs-12 slide-frame">
                    <Slide editMode={true}
                      slide={currentSlide}
                      files={files}
                      slideDeckId={slideDeck._id}/>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <PermissionDenied />
        }
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
