import React, {Component} from 'react';
import {Checkbox, Input} from 'antd';
import { Button } from 'antd';
import './style.scss'
import {tasksServices} from "../../services/tasksServices";

class Tasks extends Component {

    state = {
        taskName: '',
        tasks: [],
        statusTask: false,
        editTaskName: ''
    };

    handleChange(event)  {
        this.setState({taskName: event.target.value})
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.createTask()
        }
    };

    saveEdit = (event) => {
        if (event.key === 'Enter') {
            this.setState({editTaskName: event.target.value});
            const tempTasks = this.state.tasks;
            for (let key in tempTasks) {
                if(event.target.id == tempTasks[key].id) {
                    tempTasks[key].task = event.target.value;
                }
            }
            this.setState({tasks: tempTasks});
        }
    };

    editTask(id) {
        this.setState({taskId: id});
    }

    createTask = () => {
        tasksServices.createTask(this.state.taskName, this.state.statusTask).then((res) => {
            const tempTasks = this.state.tasks;
            tempTasks.push(res);
            this.setState({tasks: tempTasks, taskName: ''})
        });
    };

    deleteTask(id) {
        tasksServices.deleteTask(id).then((res) => {
            tasksServices.getAllTasks().then((res) => {
                this.setState({tasks: res});
            })
        })
    }

    componentDidMount() {
        tasksServices.getAllTasks().then((res) => {
            this.setState({tasks: res});
        })
    }

    componentWillUnmount() {

    }

    render() {
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
                {this.state.tasks.map((item) => (
                    <div className='tasks__item' key={item.id}>
                        <Checkbox onChange={this.onChange}
                                  className={(this.state.taskId === item.id) ? 'hide-checkbox': 'tasks__item-status'}>
                            {(this.state.taskId === item.id) ?
                                <Input defaultValue={item.task}
                                       className='tasks__item-edit'
                                       id={`${item.id}`}
                                       onKeyPress={this.saveEdit.bind(this)}/> :
                                item.task}
                        </Checkbox>
                        <div className="actions">
                            <Button type="primary" icon="edit"
                                    className="actions-edit"
                                    onClick={this.editTask.bind(this, item.id)}/>
                            <Button type="danger"
                                    icon="delete"
                                    onClick={this.deleteTask.bind(this, item.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Tasks;