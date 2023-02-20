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
        url:"http://localhost:8080/api/v1/auth/getCurrentUser",
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}





export const addGameToCurrentUser=(id)=>{
    return axios({
        method:'PUT',
        url:`http://localhost:8080/api/v1/auth/getGame/${id}/user`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const getCurrentUserGames=()=>{
    return axios({
        method:'GET',
        url:`http://localhost:8080/api/v1/auth/getCurrentUserGames`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })

}