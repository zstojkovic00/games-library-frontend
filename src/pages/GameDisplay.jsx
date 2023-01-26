import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
const GameDisplay = () => {

    const [game, setGame] = useState([]);

    const {id} = useParams();

    const getGame = async() => {
        const {data: result} = await axios.get(`https://api.rawg.io/api/games/${id}?key=`+process.env.REACT_APP_API_KEY,{
        })
        console.log(result);
        setGame(result);
    }
    useEffect(()=> {
        getGame();

    }, []);


    return (
        <div>
            {game.name}
        </div>
    );
};

export default GameDisplay;