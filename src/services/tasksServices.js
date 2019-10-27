import axios from 'axios';

export const tasksServices = {
    getAllTasks,
    createTask,
    deleteTask,
    updateTasks
};


function getAllTasks(listId) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}tasks?listId=${listId}`)
        .then(resp => resp.data)
}

function createTask(task, status, listId) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}tasks`, {task: task, isDone: status, listId: listId})
        .then(resp => resp.data)
}

function deleteTask(id) {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}tasks/${id}`)
        .then(resp => resp.data)
}

function updateTasks(task, property) {
    return axios.put(`${process.env.REACT_APP_BASE_URL}tasks/${task.id}`, {...task, ...property})
        .then(resp => resp.data)
}