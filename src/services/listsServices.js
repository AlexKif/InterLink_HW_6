import axios from 'axios';

export const listsServices = {
    getAllLists,
    createListItem,
    deleteListItem
};

function getAllLists() {
    return axios.get(' http://localhost:3005/lists')
        .then(resp => resp.data)
}

function createListItem(data) {
    return axios.post(' http://localhost:3005/lists', {listName: data})
        .then(resp => resp.data)
}

function deleteListItem(id) {
    return axios.delete(`http://localhost:3005/lists/${id}`)
        .then(resp => resp.data)
}