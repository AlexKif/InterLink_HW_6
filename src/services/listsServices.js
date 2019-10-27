import axios from 'axios';

export const listsServices = {
    getAllLists,
    createListItem,
    deleteListItem
};

function getAllLists() {
    return axios.get(`${process.env.REACT_APP_BASE_URL}lists`)
        .then(resp => resp.data)
}

function createListItem(data) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}lists`, {listName: data})
        .then(resp => resp.data)
}

function deleteListItem(id) {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}lists/${id}`)
        .then(resp => resp.data)
}