import React from 'react';
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

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editValue: '' };
    }

    render() {
        const {addNote, ...props} = this.props;
        return (
            <div>
            <TextField
            fullWidth={true}
            onKeyPress={(e) => this.checkEnter(e) }
                    onChange={(e) => this.setState({ editValue: e.target.value }) }
                    value={this.state.editValue}
                hintText="Enter a New Task"/>
                
                <FloatingActionButton 
                    
                    style= {style}
                    mini={true}
                    onClick={this.finishEdit}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>)
    }

    finishEdit = () => {
        this.props.addNote(this.state.editValue);
        this.setState({ editValue: '' });
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit();
        }
    }
}