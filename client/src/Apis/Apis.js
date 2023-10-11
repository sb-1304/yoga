import axios from 'axios';

import CONSTANTS from '../CONSTANTS';

const { BASE_URL } = CONSTANTS;

function errorHandler(error) {
    if (error.response) {
        alert(error.response.data);
        console.log('\nError', error);
    } else if (error.request) {
        alert(error.message);
        console.log('\nError', error);
    } else {
        alert(error.message);
        console.log('\nError', error);
    }
}

const GET = async (url, payload) => {

    return axios.get(BASE_URL.concat(url), payload)
        .then(res => res.data)
        .catch(errorHandler);
}

const POST = async (url, payload) => {

    return axios.post(BASE_URL.concat(url), payload)
        .then(res => res.data)
        .catch(errorHandler);
}

const PUT = async (url, payload) => {

    return axios.put(BASE_URL.concat(url), payload)
        .then(res => res.data)
        .catch(errorHandler);
}

const DELETE = async (url, payload) => {

    return axios.delete(BASE_URL.concat(url), payload)
        .then(res => res.data)
        .catch(errorHandler);
}

export { GET, POST, PUT, DELETE }