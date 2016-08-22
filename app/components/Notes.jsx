import React from 'react';
import Note from './Note';
import TaskEditor from './TaskEditor';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import ReactMarkdown from 'react-markdown';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500
} from 'material-ui/styles/colors';

export default class Notes extends React.Component {
    render() {
        const {notes, onEdit = () => { }, onDelete = () => { } } = this.props;
        return (
            <div>
                <ul className = "notes" id="notes">{notes.map(({id, editing, task}) =>
                    <li key={id}>
                        <Card>
                            <CardHeader
                                avatar = {<Avatar>{task.charAt(0) }</Avatar>}
                                title={<ReactMarkdown className='mrkdwn' source={task}/>}
                                actAsExpander={true}
                                subtitle="Task"/>
                            <CardText expandable={true}>
                                <CardActions>
                                    <TaskEditor task = {task} id='{id}' onEdit = {onEdit.bind(null, id) }/>
                                    <FlatButton label="Complete"
                                        onClick = {onDelete.bind(null, id) } />
                                </CardActions>
                            </CardText>
                        </Card>
                    </li>
                ) }</ul></div>
        )
    }
}
