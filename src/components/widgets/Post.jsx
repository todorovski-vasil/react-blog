import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPost } from '../../reducers/blog';

function Post(props) {
    let { id } = useParams();

    useEffect(() => {
        if (!props.loading && !Object.keys(props.post).length) {
            props.loadPost({ id: id });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let post = null;
    let comments = null;
    if (props.error.code !== 200) {
        if (props.error.cod > 0) {
            post = <h2>{props.error.code + ': ' + props.error.message}</h2>;
        } else {
            post = <h2>{props.error.message}</h2>;
        }
    } else if (props.loading) {
        post = <h2>Loading post...</h2>;
    } else {
        post = (
            <>
                <h3>{props.post.title}</h3>
                <p>{props.post.body}</p>
                <h6>Writen by {props.post.userName}</h6>
            </>
        );
        if (props.comments) {
            comments = props.comments.map(comment => (
                <React.Fragment key={comment.id}>
                    <h4>{comment.name}</h4>
                    <p>{comment.body}</p>
                    <h6>by: {comment.email}</h6>
                </React.Fragment>
            ));
        }
    }

    return (
        <div>
            {post}
            {comments}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.postLoading,
        post: state.post,
        comments: state.comments,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPost: postInfo => dispatch(loadPost(postInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
