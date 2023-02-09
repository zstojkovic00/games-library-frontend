import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './style/auth.css'




const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }

    return (
        <div className="auth_wrapper" >
        <div className="auth-form">
            <h2> Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input className="input_form" value={email} onChange={(e)=> setEmail(e.target.value)} type="email"  id="email" name="email" />
            <label htmlFor="password">password</label>
            <input className="input_form" value={password} onChange={(e)=> setPassword(e.target.value)} type="password"  id="password" name="password"/>
            <button className="loginButton" type="submit">Log in</button>
        </form>
            <Link className="linkButton" to="/join">Don't have an account?  Join here!</Link>
        </div>
        </div>

    );
};

export default Login;