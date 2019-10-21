import axios from 'axios';

export const tasksServices = {
    getAllTasks,
    createTask,
    deleteTask
};

function getAllTasks() {
    return axios.get(' http://localhost:3005/tasks')
        .then(resp => resp.data)
}

function createTask(task, status) {
    return axios.post(' http://localhost:3005/tasks', {task: task, doneTask: status})
        .then(resp => resp.data)
}

function deleteTask(id) {
    return axios.delete(`http://localhost:3005/tasks/${id}`)
        .then(resp => resp.data)
}