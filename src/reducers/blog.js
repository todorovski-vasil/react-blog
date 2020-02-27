import { fetchPost, fetchUser } from '../api/typicode';

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
            let post = action.post ? action.post : {...state.posts[action.postId]};
            post.userName = action.user.name;
            return {
                ...state,
                posts: [...state.posts],
                post: post,
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
    post: data.post,
    postId: data.postId,
    user: data.user
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

const loadPost = (postInfo) => {
    return function(dispatch) {
        dispatch(postLoading());

        const handleError = err => {
            console.error(err);
            dispatch(postsError({ code: err.status, message: err.message }));
        }

        const payload = {
            postId: postInfo.id
        };

        (() => {
            if(postInfo.userId) {
                return new Promise(resolve => resolve({ userId: postInfo.userId }));
            } else {
                return fetchPost(postInfo.id);
            }
        })()
            .then(data => {
                console.table(data);
                if(data.id) {
                    payload.post = {...data};
                }
                return fetchUser(data.userId);
            })
            .then(data => {
                console.table(data);
                payload.user = data;
                dispatch(postSuccess(payload));
            })
            .catch(handleError);
    }
}

export {
    blogReducer,
    loadPosts,
    loadPost
};