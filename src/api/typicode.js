const API_BASE = 'https://jsonplaceholder.typicode.com';

function fetchURL(url) {
    return fetch(url)
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error("Status: " + res.status + ", on fetching from" + url);
            }
        });
}

function fetchPost(id) {
    return fetchURL(API_BASE + "/posts/" + id);
}

function fetchUser(id) {
    return fetchURL(API_BASE + "/users/" + id);
}

export {
    fetchPost,
    fetchUser
}