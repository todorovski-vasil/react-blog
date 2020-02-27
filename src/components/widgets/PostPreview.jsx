import React from 'react';

function PostPreview(props) {
    return (
        <div
            onClick={() => {
                console.log(props.id);
                props.loadPost();
            }}
        >
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </div>
    );
}

export default PostPreview;
