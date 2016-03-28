import React from 'react';

import TextBox from './text_box.jsx';

class EditTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {preview: false};
    this.togglePreview = this.togglePreview.bind(this);
    this.saveText = this.saveText.bind(this);
    this.handleRemoveSection = this.handleRemoveSection.bind(this);
  }

  togglePreview(e) {
    e.preventDefault();
    this.setState({preview: !this.state.preview});
  }

  saveText(e) {
    e.preventDefault();
    const {section, onSetSection} = this.props;

    let sectionDoc = {
      type: 'text',
      data: this.refs.textBody.value
    };

    onSetSection(sectionDoc, section.position);
  }

  handleRemoveSection(e) {
    e.preventDefault();
    const {section, onRemoveSection} = this.props;

    onRemoveSection(section.position);
  }

  render() {
    let {section} = this.props;
    let text = section.data;

    return (
      <div>
        {
          this.state.preview ?
          <div>
            <a href="#"
              className="btn btn-sm btn-secondary"
              onClick={this.togglePreview}>
              <i className="fa fa-pencil"></i>
              Edit
            </a>
            <TextBox text={text} />
          </div> :
          <div>
            <div className="edit-text-action">
              <a href="#"
                className="btn btn-sm btn-secondary"
                onClick={this.togglePreview}>
                <i className="fa fa-eye"></i>
                Preview
              </a>
              <a href="#"
                className="btn btn-sm btn-secondary"
                onClick={this.handleRemoveSection}>
                <i className="fa fa-close"></i> Remove
              </a>
            </div>
            <textarea defaultValue={text}
              ref="textBody"
              className="text-editer"
              onChange={this.saveText} />
          </div>
        }
      </div>
    );
  }
}

export default EditTextBox;
