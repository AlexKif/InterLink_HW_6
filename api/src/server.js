const tasks = [{name: 'sasha', id: 1}, {name: 'wefwef', id: 2}];
const express = require('express');
const app = express();
const port = 3004;

const logRequest = ({method, url}, res, next) => {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next()
};

app.use(express.json());

app.use(logRequest);

app.get('/tasks', (req, res) => {
    res.json(tasks)
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json(task)
});

app.listen(port, () => {
    console.log(`Server started`);
});