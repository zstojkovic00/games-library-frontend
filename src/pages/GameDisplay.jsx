import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import starFull from '../assets/images/star-full.png';
import starEmpty from '../assets/images/star-empty.png';
import { motion } from "framer-motion";
import './style/gamedisplay.css'
import { smallImage } from "../util";
import apple from '../assets/images/apple.svg'
import gamepad from '../assets/images/gamepad.svg'
import nintendo from'../assets/images/nintendo.svg'
import playstation from'../assets/images/playstation.svg'
import steam from '../assets/images/steam.svg'
import xbox from '../assets/images/xbox.svg'





const GameDisplay = () => {

    const [game, setGame] = useState([]);

    const {id} = useParams();

    const getStars = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img alt="star" key={i} src={starFull}></img>);
            } else {
                stars.push(<img alt="star" key={i} src={starEmpty}></img>);
            }
        }
        return stars;
    };

    const getPlatform = (platform) => {

        switch (platform) {
            case "PlayStation 4":
                return playstation;
            case "PlayStation 5":
                return playstation;
            case "Xbox One":
                return xbox;
            case "PC":
                return steam;
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            default:
                return gamepad;
        }



    };


    const getGame = async() => {
        const {data: result} = await axios.get(`https://api.rawg.io/api/games/${id}?key=`+process.env.REACT_APP_API_KEY,{
        })
        setGame(result);
        console.log(result);

    }

    useEffect(()=> {
        getGame();

    }, []);


    return (
        <div >
            <div className="gameDisplay__wrapper" >
            <div className="rating__wrapper">
                <h1>{game.name}</h1>
                <p>Rating: {game.rating}</p>
                {getStars()}
            </div>
            <div className="platforms__wrapper">
            <h1>Platforms</h1>
                {game.platforms?.map((data) => (
                    <img
                        alt={data.platform.name}
                        key={data.platform.id}
                        src={ getPlatform(data.platform.name)}
                    ></img>
                ))}
            </div>

                <div className='image__wrapper' >
                    <motion.img
                        src={smallImage(game.background_image, 1280)}
                        alt={game.background_image}
                    />
                </div>
            </div>
        </div>


    );
};

export default GameDisplay;

