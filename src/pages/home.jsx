import React, {useState, useEffect} from 'react';
import GameList from "../components/GameList";
import Pagination from '../components/Pagination'
import './style/home_style.css'
import {motion} from 'framer-motion';
import '../components/Navbar/navbar.css'
import './Search'
import {Link} from "react-router-dom";
import {getGamesByCriteria} from "../api/gamesService";

const Home = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(12);
    const [activeLink, setActiveLink] = useState("");
    const [title, setTitle] = useState("Best Games Of All Time");

    useEffect(() => {
        const getGames = async () => {
            let url = "best-games";
            if (activeLink === "popular-games") {
                setTitle("Popular Games")
                url = "popular-games"
            } else if (activeLink === "new-games") {
                setTitle("New Games")
                url = "new-games"
            } else if (activeLink === "upcoming-games") {
                setTitle("Upcoming Games")
                url = "upcoming-games"
            } else if (activeLink === "best-games") {
                url="best-games"
                setTitle("Best Games Of All Time")
            }
            try {
                console.log(url)
                const response = await getGamesByCriteria(url);
                setGames(response.data.results);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
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
