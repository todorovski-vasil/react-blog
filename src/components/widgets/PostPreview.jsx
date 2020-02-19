import React from 'react';
import { connect } from 'react-dexux';
import { loadPosts } from '../../reducers/blog';

function PostPreview(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            {/* <h6>Writen by {props.userId}</h6> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.blogReducer.loading,
        posts: state.blogReducer.posts,
        error: state.blogReducer.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => dispatch(loadPosts())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);