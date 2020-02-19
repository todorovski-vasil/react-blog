const initialState = {
    posts: [],
    posts_loading: true,
    posts_error: {
        code: 200,
        text: ''
    }
};

const POSTS_LOADING = 'POSTS_LOADING';
const POSTS_SUCCESS = 'POSTS_SUCCESS';
const POSTS_ERROR = 'POSTS_ERROR';

// reducer
const blogReducer = (state = initialState, action) => {
    switch(action.type) {
        case POSTS_LOADING:
            return {
                posts: [...state.posts],
                posts_loading: true,
                posts_error: { code: 200 }
            }
        case POSTS_SUCCESS:
            return {
                posts: action.data,
                posts_loading: false,
                posts_error: { code: 200 }
            }
        case POSTS_ERROR:
            return {
                posts_loading: false,
                posts_error: {
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
    errorCOde: err.code,
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
                    console.error(res);
                    dispatch(postsError({ code: res.code, message: res.message }));
                    Promise.reject('Error fetching posts');
                }
            })
            .then(data => {
                console.table(data);
                dispatch(postsSuccess(data));
            })
            .catch(err => {
                console.error(err);
                dispatch(postsError);
            });
    }
}


export {
    blogReducer,
    loadPosts
};