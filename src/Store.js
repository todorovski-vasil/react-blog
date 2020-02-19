import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { blogReducer } from './reducers/blog';

// const store = createStore(studentsReducer);
const store = createStore(blogReducer, applyMiddleware(thunk));
// const store = createStore(combineReducers({ postsReducer, studentsReducer }), applyMiddleware(thunk));

export default store;