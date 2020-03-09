import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Header from './components/widgets/Header';
// import Main from './components/layouts/Main';
import Posts from './components/widgets/Posts';
import Post from './components/widgets/Post';
import { Provider } from 'react-redux';
import Store from './Store';

function App() {
    return (
        <>
            <Provider store={Store}>
                <BrowserRouter>
                    <Header label='Header'></Header>
                    <Switch>
                        <Route exact path='/' component={Posts} />
                        <Route path='/post/:id' component={Post} />
                    </Switch>
                    <h2>Footer</h2>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
