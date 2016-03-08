import React from 'react';

import TextBox from './text_box.jsx';

class EditTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isEditing: false};
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onTextSubmit = this.onTextSubmit.bind(this);
  }

  render() {
    const {section, editMode} = this.props;
    let text = section.data || '';

    return (
      <div>
        {
          this.state.isEditing ?
            <div>
              <textarea defaultValue={text} ref="textBody" />
              <a href="#" onClick={this.onTextSubmit}>Save</a>
            </div>
          :
            <div>
              <a href="#" onClick={this.toggleEdit}>Edit</a>
              <TextBox text={text} />
            </div>
        }
      </div>
    );
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({isEditing: !this.state.isEditing});
  }

  onTextSubmit(e) {
    e.preventDefault();
    const {section, onSetSection} = this.props;

    let sectionDoc = {
      type: 'text',
      data: this.refs.textBody.value
    };
    onSetSection(sectionDoc, section.position);
    this.toggleEdit(e);
  }
}

export default EditTextBox;
