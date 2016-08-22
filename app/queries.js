import $ from 'jquery';
import jQuery from 'jquery';

const serverUrl = 'http://localhost:9000'

$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': serverUrl + url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

function postRefresh() {
    var updateQuery = 'mutation m{postTicketRefreshMessage(id:0){id}}';
    $.postJSON('/api/graphql', { query: updateQuery });
}

export function addTask(content) {
    var query = getAddTaskScript(content);
    // Posts new task. 
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            postRefresh();
        }
    });
}

export function getTasks(callback) {
    var query = getTaskScript();
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            if (callback) callback(response.data.tasks);
        }
    });
}

export function completeTask(id) {
    var query = getTaskCompleteScript(id);
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            postRefresh();
        }
    });
}

export function editTask(id, task) {
    var query = getTaskEditScript(id, task);
    $.postJSON('/api/graphql/', { query: query }, function (response) {
        if (response.errors) {
            // handle errors
        } else {
            postRefresh();
        }
    });
}

function getAddTaskScript(content) {
    return 'mutation m{addTask(task:{taskType:"Todo",content:"' + content + '"}){id,task:name}}';
}

function getTaskScript() {
    return '{tasks:getTasks(taskType:"Todo",isCompleted:false){id,task:content}}';
}

function getTaskCompleteScript(id) {
    return `mutation m{updateTask(id:${id},task:{isCompleted:true}){id,task:content}}`;
}

function getTaskEditScript(id, task) {
    return `mutation m{updateTask(id:${id},task:{content:"${task}"}){id,task:content}}`;
}