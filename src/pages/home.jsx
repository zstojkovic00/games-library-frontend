import React,{ useState, useEffect} from 'react';
import GameList from "../components/GameList";
import Pagination from '../components/Pagination'
import './style/home_style.css'
import axios from 'axios';
import { motion } from 'framer-motion';
import '../components/Navbar/navbar.css'


const Home = (props) => {

    const [games, setGames] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(12);
    const [title, setTitle] = useState("Best Games of All Time");








    const getGames = async(searchKey) => {
        const type = searchKey ? `&page=1&page_size=40&search=${searchKey}` : "&page=1&page_size=40"
        const {data: {results}} = await axios.get("https://api.rawg.io/api/games?key="+process.env.REACT_APP_API_KEY+`${type}`,{
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




    const searchGames = (e) => {
        e.preventDefault();
        setTitle(`${searchKey}`);
        getGames(searchKey);

    }






    return (


            <div className='container-games'>
                <br/>
                <form onSubmit={searchGames} className="search__container">
                    <input  value={searchKey}  onChange={(e)=> setSearchKey(e.target.value)} className="search__input" type="text" placeholder="Search games" />
                    <div className="search__button">
                        <button className="search__button-top" > Search </button>
                    </div>
                </form>
                <motion.h1 className="RowText">{title}</motion.h1>

            <div className='row'>
                <GameList games={currentGames}/>
                <Pagination gamesPerPage={gamesPerPage} totalGames={games.length}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>


        </div>



    )


};

export default Home;
