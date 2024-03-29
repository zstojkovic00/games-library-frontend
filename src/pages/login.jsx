import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {authenticate, authSuccess} from '../redux/authActions';
import {connect} from 'react-redux';
import './style/auth.css'
import {userLogin} from "../api/authenticationService";


const Login = ({loading, error, ...props}) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.authenticate();

        userLogin(values).then((res) => {

            console.log("response", res);
            if (res.status === 200) {
                props.setUser(res.data);
                console.log(res.data)
                navigate("/");
                window.location.reload();
            }
        }).catch((err) => {
            alert(err.response.data.message)
            console.log(err.response.data);
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
        <div className="auth_wrapper">
            <div className="auth-form">
                <h2> Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input className="input_form" value={values.email} onChange={handleChange} type="email" id="email"
                           name="email"/>
                    <label htmlFor="password">password</label>
                    <input className="input_form" value={values.password} onChange={handleChange} type="password"
                           id="password" name="password"/>
                    <button className="loginButton" type="submit">Log in</button>
                </form>
                <Link className="linkButton" to="/join">Don't have an account? Join here!</Link>
            </div>
        </div>

    );
};


const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (content) => {
            console.log("Content:", content);
            dispatch(authSuccess(content))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);