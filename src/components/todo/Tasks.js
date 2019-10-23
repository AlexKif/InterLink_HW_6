import React, {Component} from 'react';
import {Checkbox, Input} from 'antd';
import { Button } from 'antd';
import './style.scss'
import {tasksServices} from "../../services/tasksServices";

class Tasks extends Component {
    state = {
        taskName: '',
        tasks: [],
    };

    componentDidMount() {
        tasksServices.getAllTasks().then((res) => {
            this.setState({tasks: res});
        });
    }

    handleChange(event)  {
        this.setState({taskName: event.target.value})
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.createTask()
        }
    };

    createTask = () => {
        const id = this.props.match.params.id;
        tasksServices.createTask(this.state.taskName, false, id).then((res) => {
            const tempTasks = this.state.tasks;
            tempTasks.push(res);
            this.setState({tasks: tempTasks, taskName: ''})
        });
    };

    deleteTask(task) {
        tasksServices.deleteTask(task.id).then((res) => {
            this.setState(({tasks}) => {
                const index = tasks.indexOf(task);
                tasks.splice(index, 1);
                return {tasks: tasks}
            });
        });
    }

    editTask(task) {
        const changedTask = prompt('Edit task', task.task);
        tasksServices.updateTasks(task, {task: changedTask}).then((res) => {
            const tempTasks = this.state.tasks;
            const indexTask = tempTasks.indexOf(task);
            tempTasks[indexTask] = res;
            this.setState({tasks: tempTasks});
        })
    }

    onChangeCheckbox = (task, status, event) => {
        tasksServices.updateTasks(task, {doneTask: event.target.checked}).then((res) => {
            const tempTasks = this.state.tasks;
            const indexTask = tempTasks.indexOf(task);
            tempTasks[indexTask] = res;
            this.setState({tasks: tempTasks});
        });
    };

    render() {

        const tempTasks = this.state.tasks.filter((task) => {
            return task.listId === this.props.listNumber
        });

        return (
            <div className="tasks">
                <Input placeholder="Enter task"
                       className="tasks__enter"
                       value={this.state.taskName}
                       onKeyPress={this.onKeyPress.bind(this)}
                       onChange={this.handleChange.bind(this)}/>
                <Button type="primary"
                        className="tasks__send"
                        onClick={this.createTask.bind(this)}>
                    Add task
                </Button>
                {tempTasks.map((task, index) => (
                    <div className='tasks__item' key={index}>
                        <Checkbox onChange={this.onChangeCheckbox.bind(this, task, task.doneTask)}
                                  className={task.doneTask ? 'tasks__item-checkbox_done': 'tasks__item-checkbox'}
                                  checked={task.doneTask}>
                            {task.task}
                        </Checkbox>
                        <div className="actions">
                            <Button type="primary"
                                    icon="edit"
                                    className="actions-edit"
                                    onClick={this.editTask.bind(this, task)}/>
                            <Button type="danger"
                                    icon="delete"
                                    onClick={this.deleteTask.bind(this, task)}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Tasks;