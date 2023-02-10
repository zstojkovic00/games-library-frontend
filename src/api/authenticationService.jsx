import axios from 'axios';



const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}


export const userJoin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:8080/api/v1/auth/register",
        'data':authRequest
    })
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:8080/api/v1/auth/authenticate",
        'data':authRequest
    })
}


export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:"http://localhost:8080/api/v1/auth/currentUserInfo",
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

