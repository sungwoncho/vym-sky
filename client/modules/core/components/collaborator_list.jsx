import React from 'react';

class CollaboratorList extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddCollaborator = this.handleAddCollaborator.bind(this);
    this.handleRemoveCollaborator = this.handleRemoveCollaborator.bind(this);
  }

  handleAddCollaborator(e) {
    e.preventDefault();
    const {repo, addCollaborator} = this.props;
    let collaboratorId = this.refs.collaboratorId.value;

    addCollaborator(repo._id, collaboratorId);
    this.refs.collaboratorId.value = '';
  }

  handleRemoveCollaborator(collaboratorId) {
    const {repo, removeCollaborator} = this.props;

    removeCollaborator(repo._id, collaboratorId);
  }

  render() {
    let {collaborators} = this.props;

    return (
      <div>
        <ul>
          {
            collaborators.map((collaborator) => {
              return <CollaboratorItem collaborator={collaborator}
                onRemoveCollaborator={this.handleRemoveCollaborator}
                key={collaborator._id} />;
            })
          }
        </ul>
        {
          // <input type="text" ref="collaboratorId" />
          // <a href="#" onClick={this.handleAddCollaborator} className="btn btn-default btn-sm">Add</a>
        }
        <small>
          Collaborators are automatically synced with GitHub. When a collaborator
          joins Vym, she will automatically added here.
        </small>
      </div>
    );
  }
}

const CollaboratorItem = ({collaborator, onRemoveCollaborator}) => {

  function handleRemoveCollaborator(e) {
    e.preventDefault();
    onRemoveCollaborator(collaborator._id);
  }

  return (
    <li>
      {collaborator.services.github.username}
      {
        // <a href="#" onClick={handleRemoveCollaborator}>x</a>
      }
    </li>
  );
};

export default CollaboratorList;
