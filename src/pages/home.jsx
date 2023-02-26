import React,{ useState, useEffect} from 'react';
import GameList from "../components/GameList";
import Pagination from '../components/Pagination'
import './style/home_style.css'
import axios from 'axios';
import { motion } from 'framer-motion';
import '../components/Navbar/navbar.css'
import '../components/Search/Search'



const Home = (props) => {

    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(12);


    const getGames = async() => {
        const {data: {results}} = await axios.get("https://api.rawg.io/api/games?key="+process.env.REACT_APP_API_KEY+"&page_size=40",{
        })
        setGames(results);
}
    useEffect(()=> {
        getGames();

    }, []);

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);





    return (


            <div className='container-games'>


                <motion.h1 initial={{ x: "50%" }}
                           animate={{ x: "calc(100vw - 102%)" }}  className="RowText">Best Games Of All Time</motion.h1>

            <div className='row'>
                <GameList games={currentGames}/>
                <Pagination gamesPerPage={gamesPerPage} totalGames={games.length}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>


        </div>



    )


};

export default Home;
