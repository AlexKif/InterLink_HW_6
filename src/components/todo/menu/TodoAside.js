import React, {Component} from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import {Button, Input} from "antd";
import {listsServices} from "../../../services/listsServices";
import Tasks from "../Tasks";
import {Route, Switch} from "react-router-dom";

class TodoAside extends Component {

    state = {
        lists: [],
        listName: '',
    };

    componentDidMount = () => {
        const currentUrl = this.props.location.pathname;
        const currentUrlId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        listsServices.getAllLists()
            .then(res => {
                this.setState({lists: res})
            })
            .then(() => {
                 if (!this.state.lists.find((item) => item.id === +currentUrlId)) this.props.history.push(`/lists/`)
            });
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            listsServices.createListItem(event.target.value).then(res => {
                const tempList = this.state.lists;
                tempList.push(res);
                this.setState({lists: tempList});
            });
            this.setState({listName: ''})
        }
    };

    onClickList = (id) => {
        this.setState({listNumber: id});
    };

    handleChange = (event) => {
        this.setState({listName: event.target.value})
    };

    deleteList = (list) => {
        listsServices.deleteListItem(list.id).then(() => {
            this.setState(({lists}) => {
                const currentList = lists.indexOf(list);
                lists.splice(currentList, 1);
                return {lists: lists}
            });

            this.props.history.push(`/lists/`)
        });
    };

    render() {
        if(!this.state.lists) return <Redirect to="/list"/>;
        return (
            <>
                <aside className='todo-list'>
                    <h1 className='todo-list__headline'>Todo List</h1>
                    <nav className='todo-list__menu'>
                        {this.state.lists.map((item, index) => (
                            <div key={index} className='menu__item' onClick={this.onClickList.bind(this, item.id)}>
                                <Link to={`/lists/${item.id}`} className='menu__item-link'>{item.listName}</Link>
                                <Button type="danger" icon="delete" onClick={this.deleteList.bind(this, item)}/>
                            </div>
                        ))}
                    </nav>
                    <Input placeholder="New list"
                           className='todo-list__new-list'
                           onKeyPress={this.onKeyPress}
                           value={this.state.listName}
                           onChange={this.handleChange}/>
                </aside>
                <Switch>
                    <Route path="/lists" exact>
                        <h2 className='new-list-headline'>Add new list or select the one you want</h2>
                    </Route>
                    <Route path="/lists/:id">
                        <Tasks listNumber={this.state.listNumber} />
                    </Route>
                </Switch>
            </>
        );
    }
}

export default withRouter(TodoAside);