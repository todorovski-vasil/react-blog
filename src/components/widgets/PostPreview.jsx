import React from 'react';

function PostPreview(props) {
    return (
        <div onClick={() => {
                console.log(props.id);
                props.loadPost(props.id);
            }}>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            {/* <h6>Writen by {props.userId}</h6> */}
        </div>
    );
}

export default PostPreview;