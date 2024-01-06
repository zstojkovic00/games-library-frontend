import React, {useState, useEffect} from 'react';
import GameList from "../components/GameList";
import Pagination from '../components/Pagination'
import './style/home_style.css'
import axios from 'axios';
import {motion} from 'framer-motion';
import '../components/Navbar/navbar.css'
import './Search'
import {Link} from "react-router-dom";
import {popularGamesUrl, newGamesUrl, upcomingGamesUrl, bestGamesUrl} from "../api/helper";

const Home = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(12);
    const [activeLink, setActiveLink] = useState("");
    const [title, setTitle] = useState("Best Games Of All Time");

    useEffect(() => {
        const getGames = async () => {
            let url;
            if (activeLink === "popular-games") {
                setTitle("Popular Games")
                url = popularGamesUrl();
            } else if (activeLink === "new-games") {
                setTitle("New Games")
                url = newGamesUrl();
            } else if (activeLink === "upcoming-games") {
                setTitle("Upcoming Games")
                url = upcomingGamesUrl();
            } else if (activeLink === "best-games") {
                url = bestGamesUrl();
                setTitle("Best Games Of All Time")
            }
            const {data: {results}} = await axios.get("https://api.rawg.io/api/games?key=" + process.env.REACT_APP_API_KEY + `&page_size=40&${url}`, {});
            setGames(results);
        };
        getGames();
    }, [activeLink]);

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    return (
        <div className='container-games'>
            <nav className="nav2">
                <ul>
                    <li>
                        <Link onClick={() => setActiveLink("best-games")} className="navText" to="/"> Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => setActiveLink("upcoming-games")} className="navText"
                              to="/"> Upcoming </Link>
                    </li>
                    <li>
                        <Link onClick={() => setActiveLink("popular-games")} className="navText" to="/"> Popular </Link>
                    </li>
                    <li>
                        <Link onClick={() => setActiveLink("new-games")} className="navText" to="/"> New </Link>
                    </li>
                    <li>
                        <Link className="navText" to="/publishers"> Publishers</Link>
                    </li>
                </ul>
            </nav>
            <motion.h1 className="RowText">{title}</motion.h1>
            <div className='row'>
                <GameList games={currentGames}/>
                <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} setCurrentPage={setCurrentPage}
                            currentPage={currentPage}/>
            </div>
        </div>
    )
};

export default Home;
