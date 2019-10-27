import React, {Component} from 'react';
import {Checkbox, Input} from 'antd';
import { Button } from 'antd';
import './style.scss'
import {tasksServices} from "../../services/tasksServices";
import {withRouter} from "react-router-dom";

class Tasks extends Component {

    state = {
        taskName: '',
        tasks: [],
    };

    getTasks = () => {
        const currentUrl = this.props.location.pathname;
        const currentUrlId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        tasksServices.getAllTasks(currentUrlId).then((res) => {
            this.setState({tasks: res});
        });
    };

    componentDidMount() {
        this.getTasks();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.listNumber !== prevProps.listNumber) {
            this.getTasks();
        }
    };

    static getDerivedStateFromProps (props, state) {
        const currentUrl = props.location.pathname;
        const currentUrlId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        tasksServices.getAllTasks(currentUrlId).then((res) => {
            return {tasks: res}
        });
        return null
    }

    handleChange = (event) =>  {
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

    deleteTask = (task) => {
        tasksServices.deleteTask(task.id).then((res) => {
            this.setState(({tasks}) => {
                const index = tasks.indexOf(task);
                tasks.splice(index, 1);
                return {tasks: tasks}
            });
        });
    };

    editTask = (task) => {
        const changedTask = prompt('Edit task', task.task);
        tasksServices.updateTasks(task, {task: changedTask}).then((res) => {
            const tempTasks = this.state.tasks;
            const indexTask = tempTasks.indexOf(task);
            tempTasks[indexTask] = res;
            this.setState({tasks: tempTasks});
        })
    };

    onChangeCheckbox = (task, event) => {
        tasksServices.updateTasks(task, {isDone: event.target.checked}).then((res) => {
            const tempTasks = this.state.tasks;
            const indexTask = tempTasks.indexOf(task);
            tempTasks[indexTask] = res;
            this.setState({tasks: tempTasks});
        });
    };

    render() {
        return (
            <div className="tasks">
                <Input placeholder="Enter task"
                       className="tasks__enter"
                       value={this.state.taskName}
                       onKeyPress={this.onKeyPress}
                       onChange={this.handleChange}/>
                <Button type="primary"
                        className="tasks__send"
                        onClick={this.createTask}>
                    Add task
                </Button>
                {this.state.tasks.map((task, index) => (
                    <div className='tasks__item' key={index}>
                        <Checkbox onChange={this.onChangeCheckbox.bind(this, task)}
                                  className={task.isDone ? 'tasks__item-checkbox_done': 'tasks__item-checkbox'}
                                  checked={task.isDone}>
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

export default withRouter(Tasks);