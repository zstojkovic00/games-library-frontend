import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN');
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

export const userLogout = (authRequest) => {
    return axios({
        'method': 'POST',
        'url': "https://localhost:8080/api/v1/auth/logout",
        'data': authRequest
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

export const addGameToCurrentUser = (id) => {
    return axios({
        method: 'PATCH',
        url: `https://localhost:8080/api/v1/games/${id}/current-user`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}

export const getCurrentUserGames = () => {
    return axios({
        method: 'GET',
        url: "https://localhost:8080/api/v1/games/current-user",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}