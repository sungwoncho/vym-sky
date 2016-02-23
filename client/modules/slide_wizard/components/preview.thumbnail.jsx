import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';

export default React.createClass({
  componentDidMount() {
    // this.renderIframeContent();
  },

  render() {
    const {children, isActive, slideNumber} = this.props;

    let thumbnailClass = classNames({
      'thumbnail-wrapper': true,
      'active': isActive,
      [`thumbnail-slide-${slideNumber}`]: true
    });

    let content = (
      <div>
        {this.renderStylesheets()}
        {children}
      </div>
    );
    let srcDoc = ReactDOMServer.renderToStaticMarkup(content);

    return (
      <div className={thumbnailClass} onClick={this.navigateToSlide}>
        <b>{slideNumber}</b>
        <iframe className="thumbnail-iframe" srcDoc={srcDoc}></iframe>
      </div>
    );
  },

  // Not being used for now.
  // Instead, pass srcDoc to iframe because that way, it can rerender itself
  // when the iframe content changes.
  renderIframeContent() {
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
