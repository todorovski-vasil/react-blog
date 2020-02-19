import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router';
import Main from './components/layouts/Main';

function App() {
    return (
        <Switch>
            <Route path="/" component={Main}/>
        </Switch>
    );
}

export default App;
