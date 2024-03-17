import {AUTH_REQ, AUTH_SUCCESS, AUTH_FAILURE} from './types';

export const authenticate = () => {
    return {
        type: AUTH_REQ
    }
}

export const authSuccess = (content) => {
    localStorage.setItem('ACCESS_TOKEN', content.access_token);
    localStorage.setItem('REFRESH_TOKEN', content.refresh_token)
    return {
        type: AUTH_SUCCESS,
        payload: content
    }
}

export const authFailure = (error) => {
    return {
        type: AUTH_FAILURE,
        payload: error
    }
}