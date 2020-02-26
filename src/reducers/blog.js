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
    errorCode: err.code ? err.code : "-100",
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

const loadPost = (post) => {
    return function(dispatch) {
        dispatch(postLoading());

        const postsURL = 'https://jsonplaceholder.typicode.com/posts/';
        const usersURL = 'https://jsonplaceholder.typicode.com/users/';

        let postReceived = false;
        let userReceived = false;
        let tempData = null;

        const handleError = err => {
            console.error(err);
            dispatch(postsError({ code: err.status, message: err.message }));
        }

        Promise.all([
            fetch(postsURL + post.id), 
            fetch(usersURL + post.userId)
        ])
            .then(responses => {
                return responses.map(res => {
                    if(res.ok) {
                        if(res.url.indexOf(postsURL) !== -1) {
                            res.json()
                                .then(data => {
                                    if(userReceived) {
                                        dispatch(postSuccess({
                                            ...data,
                                            name: tempData.name
                                        }));
                                    } else {
                                        postReceived = true;
                                        tempData = {...data};
                                    }
                                })
                                .catch(handleError);
                        } else if(res.url.indexOf(usersURL) !== -1) {
                            // res.json().then(data => {
                            //     return {
                            //         request: 'users',
                            //         data: data
                            //     };
                            // });
                            res.json()
                                .then(data => {
                                    if(postReceived) {
                                        dispatch(postSuccess({
                                            ...tempData,
                                            name: data.name
                                        }));
                                    } else {
                                        userReceived = true;
                                        tempData = {...data};
                                    }
                                })
                                .catch(handleError);
                        } else {
                            throw new Error("Unknown responce from: " + res.url);
                        }
                    } else {
                        throw new Error("status: " + res.status + " on " + res.url);
                    }
                })
            })
            .catch(handleError);
    }
}

export {
    blogReducer,
    loadPosts,
    loadPost
};