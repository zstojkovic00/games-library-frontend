import React, {useState} from 'react';
import "./navbar.css";
import Logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";
import Search from "../Search/Search"

const Navbar = () => {
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {}
    });

    const handleInput = (e) => {
        let s = e.target.value;

        setState(prevState => {
            return { ...prevState, s:s}
        });

        console.log(state.s);


    }

    return (
     <nav className="nav">
         <Link to="/" className="site-logo"> <img src={Logo} alt="Logo"/></Link>
         <Search handleInput={handleInput}/>
         <ul>
             <li className="nav__el--login">
                 <Link className="nav__el--login-top" to="/login"> Login</Link>
             </li>

             <li className="nav__el--login">
                 <Link  className="nav__el--login-top" to="/join"> Join</Link>
             </li >



         </ul>
     </nav>
    );
};

export default Navbar;