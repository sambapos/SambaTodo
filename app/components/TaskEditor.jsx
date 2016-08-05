import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class TaskEditor extends React.Component {
    state = {
        open: false,
        task: this.props.task
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.onEdit(this.state.task);
    };

    handleCancel = () => {
        this.setState({
            open: false,
            task: this.props.task
        });
    };

    handleChange = (event) => {
        this.setState({
            task: event.target.value
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.handleCancel}
                />
        ];

        return (
            <span>
                <FlatButton label="Edit" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Edit Task"
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    <TextField
                        autoFocus
                        id={this.props.id}
                        fullWidth={true}
                        value = {this.state.task}
                        onChange={this.handleChange} />
                </Dialog>
            </span>
        );
    }
}