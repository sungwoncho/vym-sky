import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default React.createClass({
  componentDidMount() {
    let doc = this.refs.frame.contentDocument;
    let {children} = this.props;
    let content = (
      <div>
        {this.renderStylesheets()}
        {children}
      </div>
    );

    // Render initial content
    let initialContent = '<!DOCTYPE html><html><head></head><body><div></div></body></html>';
    doc.open();
    doc.write(initialContent);
    doc.close();

    // Render the slide preview
    ReactDOM.unstable_renderSubtreeIntoContainer(this, content, doc.body.children[0]);
  },

  render() {
    const {isActive, slideNumber} = this.props;

    let thumbnailClass = classNames({
      'thumbnail-wrapper': true,
      'active': isActive
    });

    if (slideNumber === -1) {
      return (
        <div className={thumbnailClass}>
          Deleting...
        </div>
      );
    }

    return (
      <div className={thumbnailClass} onClick={this.navigateToSlide}>
        <b>{slideNumber}</b>
        <iframe className="thumbnail-iframe" ref="frame"></iframe>
      </div>
    );
  },

  navigateToSlide(e) {
    e.preventDefault();

    const {showSlide, slideNumber} = this.props;
    showSlide(slideNumber);
  },

  renderStylesheets() {
    // Convert an HTML collection into an array
    let parentStylesheets = document.getElementsByTagName('link');
    let parentStylesheetsArray = Array.prototype.slice.call(parentStylesheets);

    return parentStylesheetsArray.map(function (stylesheet, index) {
      return <link rel="stylesheet" type="text/css" className={stylesheet.class} href={stylesheet.href} key={index} />;
    });
  },
});
