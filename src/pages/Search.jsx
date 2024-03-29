import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import GameList from "../components/GameList";
import axios from "axios";
import {motion} from "framer-motion";
import './style/Search.css'
import {AiOutlineArrowLeft} from "react-icons/ai";


const SearchResults = () => {
    const [games, setGames] = useState([]);
    const {query} = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const getGames = async () => {
        const {data: {results}} = await axios.get(`https://api.rawg.io/api/games?search=${query}&search_precise&key=` + process.env.REACT_APP_API_KEY, +"", {})
        const filteredResults = results.filter(game => game.rating !== 0 && game.added > 100 && game.background_image);
        setGames(filteredResults);
    }

    useEffect(() => {
        getGames();
    }, [query]);

    return (
        <div>
            <div className="queryNaslov">

                <AiOutlineArrowLeft className="buttonBack" onClick={goBack}/>
                <motion.h1
                    initial={{width: "", x: "100vw", maxWidth: "100vh"}}
                    animate={{width: ``, x: 0}}
                    transition={{duration: 1, origin: 1}}
                    className="queryText"> {query}
                </motion.h1>
            </div>

            <GameList games={games}/>

        </div>
    );
};

export default SearchResults;