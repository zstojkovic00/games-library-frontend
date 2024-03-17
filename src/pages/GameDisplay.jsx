import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import starFull from '../assets/images/star-full.png';
import starEmpty from '../assets/images/star-empty.png';
import './style/gamedisplay.css'
import {smallImage} from "../util/util";
import {addGameToCurrentUser, getCurrentUserGames} from "../api/authenticationService";
import {AiOutlineArrowLeft} from "react-icons/ai";

const GameDisplay = () => {

    const navigate = useNavigate();
    const [game, setGame] = useState([]);
    const [gamePhoto, setGamePhoto] = useState([]);
    const {id} = useParams();
    const [currentGames, setCurrentGames] = useState([]);
    const goBack = () => {
        navigate(-1);
    }

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


    useEffect(() => {
        const getGame = async () => {
            const {data: result} = await axios.get(`https://api.rawg.io/api/games/${id}?key=` + process.env.REACT_APP_API_KEY, {})
            setGame(result);
            console.log(result);
        }

        const getGameScreenshots = async () => {
            const {data: screenshots} = await axios.get(`https://rawg.io/api/games/${id}/screenshots?key=` + process.env.REACT_APP_API_KEY, {})
            setGamePhoto(screenshots);

        }

        // const getGameAchievements = async () => {
        //     const {data: achievements} = await axios.get(`https://rawg.io/api/games/${id}/achievements?key=` + process.env.REACT_APP_API_KEY, {})
        //     setAchievements(achievements);
        //     console.log(achievements);
        //
        // }

        getGame();
        getGameScreenshots();
        // getGameAchievements();

    }, [id]);

    useEffect(() => {
        getCurrentUserGames().then((response) => {
            setCurrentGames(response.data);
        }).catch(() => {
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        addGameToCurrentUser(id).then(res => {
            const gameExist = currentGames?.some((game) => game.id.toString() === id);
            if (gameExist) {
                alert("You already added this game");
            } else {
                navigate("/my-games")
            }
        }).catch((err) => {
            alert("You are not logged in!")
            console.log(err);

        });
    }

    return (
        <div>

            <div className="container flex">
                <AiOutlineArrowLeft className="buttonBack" onClick={goBack}/>
                <div className="left">
                    <div className="main_image">
                        <img
                            src={smallImage(game.background_image, 1280)}
                            alt={game.background_image}
                        />

                        <div className="option flex">
                            {gamePhoto.results?.slice(0, 3).map((data) => (

                                <img
                                    alt={data.id}
                                    key={data.id}
                                    src={data.image}
                                ></img>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="right">
                    <h3 className="gameName">{game.name}</h3>
                    <h1 className="playTime">Average time to beat game : {game.playtime}h</h1>
                    <p className="gameReleased">Released: {new Date(game.released).toLocaleDateString()}</p>
                    <h4 className="gameRating"> Rating: {game.rating} {getStars()}  </h4>
                    <p className="gameDescription">
                        {game.description_raw}
                    </p>
                    <div className="gameInfo">
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
        </div>
    );
};


export default GameDisplay

