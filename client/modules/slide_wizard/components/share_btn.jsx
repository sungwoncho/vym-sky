import React from 'react';
import Clipboard from 'clipboard';

import {urlFor} from '/client/modules/core/libs/helpers';

class ShareBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {slideDeckUid} = this.props;

    this.clipboard = new Clipboard('.share-url-btn', {
      text() {
        return urlFor('slide_deck', {slideDeckUid});
      }
    });

    // $('.share-url-btn').tooltip({
    //   placement: 'bottom',
    //   trigger: 'click',
    //   title: 'Slide deck link copied!'
    // });
    //
    // // Auto-dismiss tooltip when shown
    // $('.share-url-btn').on('shown.bs.tooltip', function (e) {
    //   setTimeout(function () {
    //     $(e.target).tooltip('hide');
    //   }, 900);
    // });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
    // $('.share-url-btn').tooltip('dispose');
  }

  render() {
    return (
      <button href="#"
        className="btn btn-sm btn-secondary share-url-btn">
        <span className="octicon octicon-clippy"></span>
        Copy Link
      </button>
    );
  }
}

export default ShareBtn;
