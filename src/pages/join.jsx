import React from 'react';
import {useState} from 'react';
import {Link} from "react-router-dom";
import './style/auth.css'
const Join = () => {


        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");


    const handleSubmit = (e) => {
            e.preventDefault();
            console.log(email);
            console.log(password);
            console.log(firstname);
            console.log(lastname);

        }

        return (
            <div className="auth_wrapper" >
            <div className="auth-form">
                <h2>Join</h2>

                <form className="join-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstname">First name</label>
                    <input className="input_form" value={firstname} onChange={(e)=> setFirstname(e.target.value)} type="text"  id="firstname" name="firstname" />
                    <label htmlFor="lastname">Last name</label>
                    <input className="input_form" value={lastname} onChange={(e)=> setLastname(e.target.value)} type="text"  id="lastname" name="lastname" />
                    <label htmlFor="email">email</label>
                    <input className="input_form" value={email} onChange={(e)=> setEmail(e.target.value)} type="email"  id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input className="input_form" value={password} onChange={(e)=> setPassword(e.target.value)} type="password"  id="password" name="password"/>
                    <button className="joinButton" type="submit">Join</button>
                </form>
                <Link className="linkButton" to="/login">Already have an account? Login here!</Link>
            </div>
            </div>

        );
};

export default Join;