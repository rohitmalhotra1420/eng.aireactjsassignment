import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StoryList from './features/StoryList';
import RawJson from './features/RawJson';

const Router = () => (
    <Switch>
        <Route exact path="/" component={StoryList} />
        <Route exact path="/rawJson" component={RawJson} />
    </Switch>
);

export default Router;