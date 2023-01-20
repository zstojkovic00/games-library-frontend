import React,{ useState, useEffect} from 'react';
import GameList from "../components/GameList";
import './style/home_style.css'

const Home = () => {


    const [games, setGames] = useState([]
    );

    const fetchGames = async () => {
        const url = "https://api.rawg.io/api/games?key=bac66ee8265d4894b6534d314dcc726a";


        const res = await fetch(url);
        const resJson = await res.json();

        console.log(resJson);
        setGames(resJson.results);

    }

    useEffect(()=> {
        fetchGames();

    }, [])


    return (
        <div className='container-games'>
            <div className='row'>
            <GameList games={games}/>
            </div>
        </div>
    )


};

export default Home;