import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editValue: '' };
    }

    render() {
        const {addNote, ...props} = this.props;
        return (
            <div>
                <input type="text"
                    onKeyPress={(e) => this.checkEnter(e) }
                    onChange={(e) => this.setState({ editValue: e.target.value }) }
                    value={this.state.editValue}/>
                <button className="add-note" onClick={this.finishEdit}>+</button>
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