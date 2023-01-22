import React from 'react';
import "./navbar.css";
import Logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";

const Navbar = () => {


    return (
     <nav className="nav">
         <Link to="/" className="site-logo"> <img src={Logo} alt="Logo"/></Link>
         {/*<Search/>*/}
         <ul>
             <li className="nav__el--login">
                 <Link className="nav__el--login-top" to="/login"> Login</Link>
             </li>

             <li className="nav__el--join">
                 <Link  className="nav__el--join-top" to="/join"> Join</Link>
             </li >



         </ul>
     </nav>
    );
};

export default Navbar;