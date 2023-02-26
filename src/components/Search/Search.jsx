import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import GameList from "../GameList";
import axios from "axios";
import {motion} from "framer-motion";
import './Search.css'
import {AiOutlineArrowLeft} from "react-icons/ai";


const SearchResults = () => {
    const [games, setGames] = useState([]);
    const {query} = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


    const getGames = async () => {
        const {data: {results}} = await axios.get(`https://api.rawg.io/api/games?search=${query}&key=` + process.env.REACT_APP_API_KEY, {})
        setGames(results);
    }

    useEffect(() => {
        getGames();
    }, [query]);

    const pomeritiLevo = query.length+ 'vh';
    console.log(pomeritiLevo);


    return (
        <div>
            <div className="queryNaslov">

                <AiOutlineArrowLeft className="buttonBack" onClick={goBack} />
                <motion.h1
                    initial={{ width: "", x: "100vw" ,maxWidth: "100vh"}}
                    animate={{ width: ``, x: 0 }}
                    transition={{ duration: 1, origin: 1 }}


                    className="queryText"> {query}
                </motion.h1>


            </div>



            <GameList games={games}/>


        </div>
    );
};

export default SearchResults;