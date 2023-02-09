import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './style/auth.css'
import {userLogin} from "../api/authenticationService";




const Login = ({...props}) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        userLogin(values).then((res)=>{

            console.log("response",res);
            if(res.status===200){
                navigate("/");
            }


        }).catch((err)=>{

            console.log(err);

        });

    }


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
        <form className="login-form" onSubmit={handleSubmit}>
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