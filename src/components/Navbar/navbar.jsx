import React, {useEffect, useState} from 'react';
import "./navbar.css";
import Logo from '../../assets/images/logo.png'
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {fetchUserData, userLogout, userRefreshToken} from "../../api/authenticationService";
import {jwtDecode} from "jwt-decode";
import {authenticate, authSuccess} from "../../redux/authActions";
import {connect} from "react-redux";


const Navbar = (props) => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('ACCESS_TOKEN');


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${searchTerm}`);
    };

    React.useEffect(() => {
        if (token) {
            fetchUserData().then((response) => {
                setData(response.data);
            }).catch(() => {
                localStorage.clear();
                // props.history.push('/');

            })
        }
    }, [])


    useEffect(() => {
        const checkTokenValidity = () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                const expirationDate = new Date(decodedToken.exp * 1000 - 10000);
                console.log("Expiration Date:", expirationDate);
                console.log("Current Date:", new Date());

                if (expirationDate <= new Date()) {
                    console.log("Refreshing token...");
                    userRefreshToken().then((res) => {
                        if (res.status === 200) {
                            localStorage.clear()
                            props.setUser(res.data);
                            console.log("Token refreshed successfully.", res.data);
                            window.location.reload()
                        }
                    });
                } else {
                    console.log("Token is still valid");
                    setIsLoggedIn(true);
                }
            }
            setTimeout(checkTokenValidity, 20000);
        };
        checkTokenValidity();
        return () => clearTimeout(checkTokenValidity);
    }, []);

    const logout = () => {
        userLogout().then((res) => {
            console.log(res)
            if (res.status === 200) {
                localStorage.clear();
                setIsLoggedIn(false);
                navigate('/');
            }
        }).catch(err => console.log(err))
    }


    if (pathname === "/login" || pathname === "/join") {
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
                                <button className="search__button-top"> Search</button>
                            </div>
                        </form>

                        <ul>
                            <li className="nav__el--join">
                                <Link className="nav__el--join-top" to="/my-games"> My games</Link>
                            </li>
                            <li className="nav__el--join">
                                <Link className="nav__el--join-top" to="/settings">   {data && `${data.firstname}`} </Link>
                            </li>
                            <li className="nav__el--join">
                                <Link onClick={logout} to="/" className="nav__el--join-top"> Logout</Link>
                            </li>
                        </ul>

                    </nav>) :
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
                                <button className="search__button-top"> Search</button>
                            </div>
                        </form>
                        <ul>
                            <li className="nav__el--login">
                                <Link className="nav__el--login-top" to="/login"> Login</Link>
                            </li>
                            <li className="nav__el--join">
                                <Link className="nav__el--join-top" to="/join"> Join</Link>
                            </li>
                        </ul>
                    </nav>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);