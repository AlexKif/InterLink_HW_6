import React from 'react';
import {Route, Switch} from "react-router-dom";
import TodoAside from "../components/todo/menu/TodoAside";
import Tasks from "../components/todo/Tasks";

const AppRouter = () => {
    return (
        <div className='content'>
            <TodoAside/>
                <Switch>
                    <Route path='/tasks/:id' exact component={Tasks}/>
                </Switch>
        </div>
    );
};

export default AppRouter;