import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Input} from "antd";
import {listsServices} from "../../../services/listsServices";
import Tasks from "../Tasks";

import {Route, Switch} from "react-router-dom";


class TodoAside extends Component {

    state = {
        listsData: [],
        listName: '',
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            listsServices.createListItem(event.target.value).then(res => {
                const tempList = this.state.listsData;
                tempList.push(res);
                this.setState({listsData: tempList});
            });
            this.setState({listName: ''})
        }
    };

    handleChange = (event) => {
        this.setState({listName: event.target.value})
    };

    deleteListName = (id) => {
        listsServices.deleteListItem(id).then(res => {
            listsServices.getAllLists().then(res => {
                this.setState({listsData: res});
            })
        })

    };

    componentDidMount() {
        listsServices.getAllLists().then(res => {
            this.setState({listsData: res});
        })
    }

    render() {
        return (
            <>
                <aside className='todo-list'>
                    <h1 className='todo-list__headline'>Todo List</h1>
                    <nav className='todo-list__menu'>
                        {this.state.listsData.map((item) => (
                            <div key={item.id} className='menu__item'>
                                <Link to={`/tasks/${item.id}`} className='menu__item-link'>{item.listName}</Link>
                                <Button type="danger" icon="delete" onClick={this.deleteListName.bind(this, item.id)}/>
                            </div>
                        ))}
                    </nav>
                    <Input placeholder="New list"
                           className='todo-list__new-list'
                           onKeyPress={this.onKeyPress.bind(this)}
                           value={this.state.listName}
                           onChange={this.handleChange.bind(this)}/>
                </aside>
            </>
        );
    }
}
export default TodoAside;