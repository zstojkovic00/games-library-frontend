import React,{ useState, useEffect} from 'react';
import GameList from "../components/GameList";
import Pagination from '../components/Pagination'
import './style/home_style.css'
import axios from 'axios';
import '../components/Navbar/navbar.css'
import {fetchUserData} from '../api/authenticationService';


const Home = (props) => {

    const [games, setGames] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(12);
    const [data,setData]=useState({});

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
            console.log(response.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/');
        })
    },[])

    const logOut=()=>{

        localStorage.clear();
        props.history.push('/');

    }

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
    const indexOfFirsgGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirsgGame, indexOfLastGame);




    const searchGames = (e) => {
        e.preventDefault();
        getGames(searchKey);
    }



    return (


            <div className='container-games'>
                <h4>Hello {data && `${data.email}`}</h4>
                <form onSubmit={searchGames} className="search__container">
                    <input  onChange={(e)=> setSearchKey(e.target.value)} className="search__input" type="text" placeholder="Search games" />
                    <div className="search__button">
                        <button className="search__button-top" > Search</button>
                    </div>
                </form>
            <div className='row'>
                <h1 className='RowText'> Best games of all time</h1>
                <GameList games={currentGames}/>
                <Pagination gamesPerPage={gamesPerPage} totalGames={games.length}  setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
        </div>

    )


};

export default Home;
