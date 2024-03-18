import axios from "axios";
import {getToken} from "./authenticationService";


export const getGamesByCriteria = (criteria) => {
    return axios({
        'method': 'GET',
        'url': `https://localhost:8080/api/v1/games?criteria=${criteria}`
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