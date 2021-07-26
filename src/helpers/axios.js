const axios = require('axios');

const fetch = (endpoint, data, method = 'GET') => {
    const token = localStorage.getItem('token') || '';
    return axios({
        method: method, 
        // url: `http://localhost:8080/${endpoint}`,
        url: `http://192.168.0.155:8080/${endpoint}`,
        data: data,
        headers: {
            'x-token': token
        }
    })
    .then((response) => 
        response
    )
    .catch((error) => 
        error.response
    )
}

export {
    fetch,
}