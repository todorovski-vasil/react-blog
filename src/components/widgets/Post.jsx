import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadPost } from '../../reducers/blog';

function Post(props) {
    let { id } = useParams();

    useEffect(() => {
        if(!props.loading && !Object.keys(props.post).length) {
            props.loadPost(id);
        }
    }, []);

    let post = null;
    if(props.error.code !== 200) {
        if(props.error.cod > 0) {
            post = <h2>{props.error.code + ": " + props.error.message}</h2>;
        } else {
            post = <h2>{props.error.message}</h2>;
        }
    } else if(props.loading) {
        post = <h2>Loading post...</h2>;
    } else {
        post = <>
            <h3>{props.post.title}</h3>
            <p>{props.post.body}</p>
            <h6>Writen by {props.post.name}</h6>
        </>;
    }

    return (
        <div>
            {post}
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

const mapDispatchToProps = (dispatch) => {
    return {
        loadPost: (id) => dispatch(loadPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);