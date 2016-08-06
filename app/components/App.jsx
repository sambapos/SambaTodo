import React from 'react';
import uuid from 'uuid';
import 'whatwg-fetch';
import Notes from './Notes';
import AddTask from './AddTask';
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
            tasks = tasks.sort((x, y) => y.id - x.id);
            console.log(tasks);
            this.setState({ notes: tasks });
        });
    }

    render() {
        const {notes} = this.state;
        return (
            <div>
                <Header/>
                <Notes notes={notes}
                    onNoteClick={this.activateNoteEdit}
                    onEdit = {this.editNote}
                    onDelete = {this.deleteNote}/>
                <AddTask addNote = {this.addNote}/>
            </div>
        );
    }

    addNote = (task = 'New') => {
        this.setState({
            notes: ([{
                id: uuid.v4(),
                task: task
            }]).concat(this.state.notes)
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