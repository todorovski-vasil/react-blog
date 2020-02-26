import React, { useEffect } from 'react';
import PostPreview from './PostPreview';
import { connect } from 'react-redux';
import { loadPosts, loadPost } from '../../reducers/blog';
import { withRouter } from 'react-router-dom';

function Posts(props) {
    useEffect(() => {
        props.loadPosts();
    }, []);

    let posts = null;
    
    if(props.error.code !== 200) {
        posts = <h2>{props.error.code + ": " + props.error.message}</h2>;
    } else if(props.loading) {
        posts = <h2>Loading posts...</h2>;
    } else {
        posts = props.posts.map(post => <PostPreview 
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            loadPost={() => {
                props.history.push('post/' + post.id);
                props.loadPost({ id: post.id, userId: post.userId });
            }}
        />);
    }

    return (
        <>
            {posts}  
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.postsLoading,
        posts: state.posts,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => dispatch(loadPosts()),
        loadPost: (data) => dispatch(loadPost(data))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));