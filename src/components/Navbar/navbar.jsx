import React, {useEffect, useState} from 'react';
import "./navbar.css";
import Logo from '../../assets/images/logo.png'
import {Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {fetchUserData} from "../../api/authenticationService";





const Navbar = (props) => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [data,setData]=useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');







    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${searchTerm}`);
    };









    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
        }).catch(()=>{
            localStorage.clear();
            props.history.push('/');

        })
    },[])

    useEffect(() => {
        const token = localStorage.getItem('USER_KEY');
        if (token) {
            setIsLoggedIn(true);
        }

    }, [setIsLoggedIn]);


    function refreshPage(){
        window.location.reload();
    }

    const logout =() => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    }

    if(pathname === "/login" || pathname === "/join") {
        return null;
    }


    return (
        <div>

            {isLoggedIn ? (

     <nav className="nav">
         <Link to="/" className="site-logo"> <img src={Logo} alt="Logo"/></Link>

         <form className="search__container" onSubmit={handleSearchSubmit}>
             <input className="search__input"
                    type="text"
                    placeholder="Search games"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
             />
             <div className="search__button">
                 <button className="search__button-top" > Search </button>
             </div>
         </form>


         <ul>
             <li className="nav__el--join">
                 <Link  className="nav__el--join-top" to="/my-games"> My games</Link>
             </li >

             <li className="nav__el--join">
                 <Link  className="nav__el--join-top" to="/settings">   {data && `${data.firstname}`} </Link>
             </li >

             <li className="nav__el--join">
                 <Link  onClick={logout} to="/" className="nav__el--join-top"> Logout</Link>
             </li>
         </ul>

     </nav> ) :
                (



                    <nav className="nav">

                        <Link to="/" className="site-logo"> <img src={Logo} alt="Logo"/></Link>


                        <form className="search__container" onSubmit={handleSearchSubmit}>
                            <input className="search__input"
                                type="text"
                                placeholder="Search games"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <div className="search__button">
                                <button className="search__button-top" > Search </button>
                            </div>
                        </form>


                        <ul>




                        <li className="nav__el--login">
                            <Link  className="nav__el--login-top" to="/login"> Login</Link>
                        </li>

                        <li className="nav__el--join">
                            <Link  className="nav__el--join-top" to="/join"> Join</Link>
                        </li>

                        </ul>


                    </nav>


                )}











        </div>
    );
};

export default Navbar;