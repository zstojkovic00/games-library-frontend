import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import starFull from '../assets/images/star-full.png';
import starEmpty from '../assets/images/star-empty.png';
import {motion} from "framer-motion";
import './style/gamedisplay.css'
import {smallImage} from "../util/util";
import {addGameToCurrentUser} from "../api/authenticationService";


const GameDisplay = ({...props}) => {

    const navigate = useNavigate();
    const [game, setGame] = useState([]);
    const [gamePhoto, setGamePhoto] = useState([]);
    const {id} = useParams();
    const [currentImage, setCurrentImage] = useState(game.background_image);
    const changeImage = (data) => {
        setCurrentImage(data.image);
    };

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


    const getGame = async () => {
        const {data: result} = await axios.get(`https://api.rawg.io/api/games/${id}?key=` + process.env.REACT_APP_API_KEY, {})
        setGame(result);
        console.log(result);
    }

    const GetGameScreenshots = async () => {
        const {data: screenshots} = await axios.get(`https://rawg.io/api/games/${id}/screenshots?key=` + process.env.REACT_APP_API_KEY, {})
        setGamePhoto(screenshots);
        console.log(screenshots);

    }

    useEffect(() => {
        getGame();
        GetGameScreenshots();

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        addGameToCurrentUser(id).then((res) => {

            console.log("response", res);
            if (res.status === 200) {
                navigate("/my-games");
            }


        }).catch((err) => {

            console.log(err);

        });

    }


    return (

        <div className="container flex">
            <div className="left">
                <div className="main_image">
                    <motion.img
                        src={smallImage(game.background_image, 1280)}
                        alt={game.background_image}
                    />
                    <div className="option flex">
                        {gamePhoto.results?.map((data) => (
                            <img
                                alt={data.id}
                                key={data.id}
                                src={data.image}
                            ></img>
                        ))}

                    </div>

                </div>
            </div>
            <div class="right">
                <h3 className="gameName">{game.name}</h3>
                <p className="gameReleased">Released: {new Date(game.released).toLocaleDateString()}</p>
                <h4 className="gameRating"> Rating: {game.rating} {getStars()}  </h4>
                <p className="gameDescription">
                    {game.description_raw}
                </p>
                <div class="gameInfo">
                    <p className="gamePlatforms">Platforms: {game.platforms?.map((p) => p.platform.name).join(', ')}</p>
                    <p className="gameGenres">Genres: {game.genres?.map((g) => g.name).join(', ')}</p>
                    <p className="gamePublishers">Publishers: {game.publishers?.map((p) => p.name).join(', ')}</p>
                </div>

                <form className="game_container" onSubmit={handleSubmit}>
                    <div className="search__button">
                        <button className="search__button-top"> Add Game</button>
                    </div>
                </form>
            </div>

        </div>


    );
};


export default GameDisplay

