import React from 'react';
import screenfull from 'screenfull';


class FullscreenBtn extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.state = {isFullScreen: false};
  }

  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.setState({isFullScreen: !this.state.isFullScreen});
    }
  }

  render() {
    return (
      <button className="btn btn-sm btn-secondary" onClick={this.toggleFullScreen}>
        {
          this.state.isFullScreen ?
          <i className="fa fa-compress"></i> :
          <i className="fa fa-expand"></i>
        }
      </button>
    );
  }
}

export default FullscreenBtn;
