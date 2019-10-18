import React, {Component} from 'react';
import { Input } from 'antd';
import { Button } from 'antd';
import './style.scss'
import { List } from 'antd';

class Todo extends Component {

    state = {
        task: '',
        data: []
    };

    handleChange(event)  {
        this.setState({task: event.target.value})
    };

    addTask() {
        const task = this.state.task;
        const data = this.state.data;
        const tempData = data.splice();
        tempData.push(task);
        this.setState({data: tempData})
    }

    render() {
        const { data } = this.state;
        return (
            <div className="todo-app">
                <Input placeholder="Enter task" className="enter-task" value={this.state.task} onChange={this.handleChange.bind(this)}/>
                <Button type="primary" className="enter-task-btn" onClick={this.addTask.bind(this)}>Add task</Button>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {item}
                            <div className="actions">
                                <Button type="primary" icon="edit" className="actions-edit"/>
                                <Button type="danger" icon="delete"/>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Todo;