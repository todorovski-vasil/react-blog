const initialState = {
    posts: [],
    postsLoading: false,
    error: {
        code: 200,
        message: ''
    },
    post: {},
    postLoading: false
};

const POSTS_LOADING = 'POSTS_LOADING';
const POSTS_SUCCESS = 'POSTS_SUCCESS';
const POSTS_ERROR = 'POSTS_ERROR';

const POST_LOADING = 'POST_LOADING';
const POST_SUCCESS = 'POST_SUCCESS';
const POST_ERROR = 'POST_ERROR';

// reducer
const blogReducer = (state = initialState, action) => {
    switch(action.type) {
        case POSTS_LOADING:
            return {
                posts: [...state.posts],
                postsLoading: true,
                error: { code: 200 }
            }
        case POSTS_SUCCESS:
            return {
                posts: action.data,
                postsLoading: false,
                error: { code: 200 }
            }
        case POSTS_ERROR:
            return {
                postsLoading: false,
                error: {
                    code: action.errorCode,
                    message: action.message
                }
            }
        case POST_LOADING:
            return {
                ...state,
                posts: [...state.posts],
                post: {...state.post},
                postLoading: true,
                error: { code: 200 }
            }
        case POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts],
                post: action.data,
                postLoading: false,
                error: { code: 200 }
            }
        case POST_ERROR:
            return {
                ...state,
                posts: [...state.posts],
                postLoading: false,
                error: {
                    code: action.errorCode,
                    message: action.message
                }
            }
        default:
            return state;
    }
}

// action creators
const postsLoading = () => ({
    type: POSTS_LOADING
});

const postsSuccess = (data) => ({
    type: POSTS_SUCCESS,
    data: data
});

const postsError = (err) => ({
    type: POSTS_ERROR,
    errorCode: err.code,
    message: err.message
});

const postLoading = () => ({
    type: POST_LOADING
});

const postSuccess = (data) => ({
    type: POST_SUCCESS,
    data: data
});

const postError = (err) => ({
    type: POST_ERROR,
    errorCode: err.code,
    message: err.message
});

// thunk midleware
const loadPosts = () => {
    return (dispatch) => {
        dispatch(postsLoading());

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw(res);
                }
            })
            .then(data => {
                console.table(data);
                dispatch(postsSuccess(data));
            })
            .catch(err => {
                console.error(err);
                dispatch(postsError({ code: err.status, message: err.statusText }));
            });
    }
}

const loadPost = (id) => {
    return function(dispatch) {
        dispatch(postLoading());

        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw(res);
                }
            })
            .then(data => {
                console.table(data);
                dispatch(postSuccess(data));
            })
            .catch(err => {
                console.error(err);
                dispatch(postError({ code: err.status, message: err.statusText }));
            });
    }
}

export {
    blogReducer,
    loadPosts,
    loadPost
};