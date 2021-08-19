const axios = require('axios');

const fetch = (endpoint, data, method = 'GET') => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token') || '';
    return axios({
        method: method, 
        url: `${baseUrl}${endpoint}`,
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