const API_BASE = 'https://jsonplaceholder.typicode.com';

function fetchURL(url) {
    return fetch(url).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(
                'Status: ' + res.status + ', on fetching from ' + url
            );
        }
    });
}

function fetchPost(id = '', _fetchURL = fetchURL) {
    return _fetchURL(API_BASE + '/posts/' + id);
}

function fetchUser(id = '', _fetchURL = fetchURL) {
    return _fetchURL(API_BASE + '/users/' + id);
}

function fetchCommentsForPost(id = '', _fetchURL = fetchURL) {
    return _fetchURL(API_BASE + '/comments?postId=' + id);
}

export { fetchPost, fetchUser, fetchCommentsForPost, fetchURL };
