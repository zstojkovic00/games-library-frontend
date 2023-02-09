import React from 'react';
import axios from 'axios';



export const userJoin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:8080/api/v1/auth/register",
        'data':authRequest
    })
}

