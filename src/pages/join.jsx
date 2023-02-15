import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './style/auth.css'
import {userJoin} from "../api/authenticationService";
import {authenticate, authSuccess} from "../redux/authActions";
import {connect} from "react-redux";


const Join = ({...props}) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });




    const handleSubmit = (e) => {
            e.preventDefault();
            console.log(values);
            props.authenticate();

            userJoin(values).then((res)=>{

                console.log("response",res);
                if(res.status===200){
                    props.setUser(res.data);
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
                <h2>Join</h2>

                <form className="join-form" onSubmit={handleSubmit}>
                    <label htmlFor="firstname">First name</label>
                    <input className="input_form" value={values.firstname}  onChange={handleChange} type="text"  id="firstname" name="firstname" required/>
                    <label htmlFor="lastname">Last name</label>
                    <input className="input_form" value={values.lastname} onChange={handleChange} type="text"  id="lastname" name="lastname" required/>
                    <label htmlFor="email">email</label>
                    <input className="input_form" value={values.email} onChange={handleChange} type="email"  id="email" name="email" required/>
                    <label htmlFor="password">password</label>
                    <input className="input_form" value={values.password} onChange={handleChange} type="password"  id="password" name="password" required/>
                    <button className="joinButton" type="submit">Join</button>
                </form>
                <Link className="linkButton" to="/login">Already have an account? Login here!</Link>
            </div>
            </div>

        );
};

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Join);