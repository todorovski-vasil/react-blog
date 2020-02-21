const API_BASE = 'http://192.168.71.133:8800';

const login = (username, password) => {
    fetch(`${API_BASE}/login`,
        {
            method: 'post',
            body: JSON.stringify({
                username: 
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('jwd', data);
        })
        .catch(err => {
            console.error(err);
        })
}

const refreshToken = () => {
    return fetch(`${API_BASE}/refresh-token`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('jwd', data);
        })
        .catch(err => {
            console.error(err);
        })
}

const privateGet = (url) => {
    return fetch(url, 
        {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
}

export {
    login,
    refreshToken
}