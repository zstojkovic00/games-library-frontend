import axios from 'axios';



// const getToken=()=>{
//     return localStorage.getItem('USER_KEY');
// }


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
        // headers:{
        //     'Authorization':'Bearer '+getToken()
        // },
        'data':authRequest
    })
}

