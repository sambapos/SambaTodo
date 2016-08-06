import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
};

export default class AddTask extends React.Component {
  state = {
    open: false, editValue: ''
  };

  handleOpen = () => {
    this.setState({ open: true, editValue: '' });
  };

  handleClose = () => {
    this.finishEdit();
    this.setState({ open: false, editValue: '' });
  };

  handleCancel = () => {
    this.setState({ open: false, editValue: '' });
  };

  finishEdit = () => {
    this.props.addNote(this.state.editValue);
    this.setState({ editValue: '' });
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleClose();
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
        />
    ];

    return (
      <div>
        <FloatingActionButton
          style= {style}
          mini={true}
          onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a Task"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <TextField
            fullWidth={true}
            onKeyPress={(e) => this.checkEnter(e) }
            onChange={(e) => this.setState({ editValue: e.target.value }) }
            value={this.state.editValue}
            hintText="Enter Task details here"/>
        </Dialog>
      </div>
    );
  }
}