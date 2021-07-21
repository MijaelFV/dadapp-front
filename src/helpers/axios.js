const axios = require('axios');
// const baseUrl = process.env.REACT_APP_API_URL;

const fetch = async(endpoint, data, method = 'GET') => {
    const token = localStorage.getItem('token') || '';
    try {
        const instance = axios({
            method: method, 
            url: `http://localhost:8080/${endpoint}`,
            data: data,
            headers: {
                'x-token': token
            }
        })
        
        return instance;
    } catch (error) {
        console.log(error);
    }
}

export {
    fetch,
}