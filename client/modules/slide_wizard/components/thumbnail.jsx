import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToSlide = this.navigateToSlide.bind(this);
  }

  componentWillMount() {
    // Keep track of children props to compare with new children props later
    // when component is updating and optionally re-render iframe if the
    // children props are updated
    //
    // Necessary because we need to know when to re-render the iframe content
    // Rendering iframe content within this.render() with 'srcDoc' attribute
    // Causes errors because we are injecting dependencies in Mantra
    this.setState({childrenProps: this.props.children.props});
  }

  componentDidMount() {
    this.renderIframeContent();
  }

  shouldComponentUpdate(nextProps) {
    if (!_.isEqual(nextProps.children.props.slide, this.props.children.props.slide)) {
      this.renderIframeContent(nextProps);
    }
    return true;
  }

  render() {
    const {isActive, slideNumber} = this.props;

    let thumbnailClass = classNames({
      'thumbnail-wrapper': true,
      [`thumbnail-slide-${slideNumber}`]: true
    });

    return (
      <div className={thumbnailClass} onClick={this.navigateToSlide}>
        <iframe className="thumbnail-iframe" ref="frame"></iframe>
      </div>
    );
  }

  /**
   * @params [newProps] - if passed, the method will look for children in newProps
   *         rather than this.props. Usually passed by shouldComponentUpdate.
   */
  renderIframeContent(newProps) {
    let doc = this.refs.frame.contentDocument;
    let {children} = newProps || this.props;
    let content = (
      <div className="thumbnail-content">
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
  }

  navigateToSlide(e) {
    e.preventDefault();

    const {showSlide, slideNumber} = this.props;
    showSlide(slideNumber);
  }

  renderStylesheets() {
    // Convert an HTML collection into an array
    let parentStylesheets = document.getElementsByTagName('link');
    let parentStylesheetsArray = Array.prototype.slice.call(parentStylesheets);

    return parentStylesheetsArray.map(function (stylesheet, index) {
      return (
        <link rel="stylesheet"
        type="text/css"
        className={stylesheet.class}
        href={stylesheet.href}
        key={index} />
      );
    });
  }
}

Thumbnail.propTypes = {
  children: React.PropTypes.object.isRequired // Nested component
};

export default Thumbnail;
