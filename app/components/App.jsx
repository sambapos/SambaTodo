import React from 'react';
import uuid from 'uuid';
import 'whatwg-fetch';
import Notes from './Notes';
import Header from './Header';
import Signalr from '../signalr';
import {addTask, getTasks, completeTask, editTask} from '../queries';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Loading...'
                }
            ]
        }
    }

    componentDidMount() {
        Signalr.connect(() => this.refreshTasks());
        this.refreshTasks();
    }

    refreshTasks() {
        getTasks((tasks) => {
            console.log(tasks);
            this.setState({ notes: tasks });
        });
    }

    render() {
        const {notes} = this.state;
        return (
            <div>
                <Header addNote = {this.addNote}/>
                <Notes notes={notes}
                    onNoteClick={this.activateNoteEdit}
                    onEdit = {this.editNote}
                    onDelete = {this.deleteNote}/>
            </div>
        );
    }

    addNote = (task = 'New') => {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: task
            }])
        });
        addTask(task);
    }

    deleteNote = (id, e) => {
        e.stopPropagation();
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
        completeTask(id);
    }

    activateNoteEdit = (id) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    note.editing = true;
                }
                return note;
            })
        });
    }

    editNote = (id, task) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    note.editing = false;
                    note.task = task;
                }
                return note;
            })
        });
        editTask(id, task);
    }
}