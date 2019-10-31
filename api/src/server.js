const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'kif',
    password : '159753qqq'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();
const port = 3001;
const data = [{id: 1, name: "sasha"}, {id: 2, name: "kostya"}, {id: 3, name: "max"}];

app.use(express.json());

app.get('/', (req, res) => {
    res.json(data)
});

app.post('/', (req, res) => {
    const temp = req.body;
    data.push(temp);
    res.json(temp)
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const findId = data.findIndex(item => item.id == id );
    const test = data.splice(findId, 1);
    res.status(200).json({successfully: "task deleted"});
    res.json(test);
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const task = data.find(t => t.id == id);
    if(task) {
        Object.assign(task, req.body);
        res.json(task)
    } else {
        res.status(404).json({error: 'task not found'})
    }
});

app.listen(port);
connection.end();