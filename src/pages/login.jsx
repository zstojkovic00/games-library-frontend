import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './style/auth.css'
// import {userLogin} from '../api/authenticationService';




const Login = ({...props}) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    // const [jwt, setJwt] = useState("");
    //
    //
    //
    // const handleSubmit=(evt)=>{
    //     evt.preventDefault();
    //
    //     userLogin(values).then((response)=>{
    //
    //         console.log("response",response);
    //         if(response.status===200){
    //             props.setUser(response.data);
    //             props.history.push('/');
    //         }
    //
    //
    //     }).catch((err)=>{
    //
    //         console.log(err);
    //
    //     });
    //
    //
    // }






    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="auth_wrapper" >
        <div className="auth-form">
            <h2> Login</h2>
        <form className="login-form">
            <label htmlFor="email">email</label>
            <input className="input_form" value={values.email} onChange={handleChange} type="email"  id="email" name="email" />
            <label htmlFor="password">password</label>
            <input className="input_form" value={values.password} onChange={handleChange} type="password"  id="password" name="password"/>
            <button className="loginButton" type="submit">Log in</button>
        </form>
            <Link className="linkButton" to="/join">Don't have an account?  Join here!</Link>
        </div>
        </div>

    );
};

export default Login;