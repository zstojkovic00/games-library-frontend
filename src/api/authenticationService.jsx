import axios from 'axios';

export const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN');
}
const getRefreshToken = () => {
    return localStorage.getItem("REFRESH_TOKEN");
}
export const userJoin = (authRequest) => {
    return axios({
        'method': 'POST',
        'url': "https://localhost:8080/api/v1/auth/register",
        'data': authRequest
    })
}

export const userLogin = (authRequest) => {
    return axios({
        'method': 'POST',
        'url': "https://localhost:8080/api/v1/auth/authenticate",
        'data': authRequest
    })
}

export const userLogout = () => {
    return axios({
        'method': 'POST',
        'url': "https://localhost:8080/api/v1/auth/logout",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const userRefreshToken = () => {
    return axios({
        'method': 'POST',
        'url': "https://localhost:8080/api/v1/auth/refresh-token",
        headers: {
            'Authorization': 'Bearer ' + getRefreshToken()
        }
    })
}

export const fetchUserData = (authRequest) => {
    return axios({
        method: 'GET',
        url: "https://localhost:8080/api/v1/users/current",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}