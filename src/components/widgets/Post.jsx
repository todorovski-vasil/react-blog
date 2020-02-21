import React from 'react';
import { connect } from 'react-redux';

function Post(props) {
    return (
        <div>
            <h3>{props.post.title}</h3>
            <p>{props.post.body}</p>
            <h6>Writen by {props.post.userId}</h6>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.postLoading,
        post: state.post,
        error: state.error
    }
};

export default connect(mapStateToProps)(Post);