import axios from 'axios';

export const tasksServices = {
    getAllTasks,
    createTask,
    deleteTask,
    updateTasks
};

function getAllTasks() {
    return axios.get(' http://localhost:3005/tasks')
        .then(resp => resp.data)
}

function createTask(task, status, listId) {
    return axios.post(' http://localhost:3005/tasks', {task: task, doneTask: status, listId: listId})
        .then(resp => resp.data)
}

function deleteTask(id) {
    return axios.delete(`http://localhost:3005/tasks/${id}`)
        .then(resp => resp.data)
}

function updateTasks(task, property) {
    return axios.put(`http://localhost:3005/tasks/${task.id}`, {...task, ...property})
        .then(resp => resp.data)
}