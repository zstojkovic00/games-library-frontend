import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {AiOutlineArrowLeft} from "react-icons/ai";

const PublishDisplay = () => {


    const [gameOfPublisher, setGameOfPublisher] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }


    useEffect(() => {

        const getGameOfPublisher = async () => {
            const {data: games} = await axios.get("https://api.rawg.io/api/games?key=" + process.env.REACT_APP_API_KEY + `&publishers=${id}&page_size=40`, {})
            setGameOfPublisher(games);
            console.log(games);


        }


        getGameOfPublisher();


    }, []);


    return (
        <div>
            <div className="queryNaslov">
                <AiOutlineArrowLeft className="buttonBack" onClick={goBack}/>
                <motion.h1
                    initial={{width: "", x: "100vw", maxWidth: "100vh"}}
                    animate={{width: ``, x: 0}}
                    transition={{duration: 1, origin: 1}}


                    className="queryText">Games of {id.toLowerCase()
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}</motion.h1>

            </div>
            <div className='games'>
                <div className='gameList'>


                    {

                        gameOfPublisher.results?.map((publisher, index) => {
                                return (
                                    <div className="gameItem" key={index}>

                                        <Link to={`/games/${publisher.id}`}>

                                            <img className="bgImage" src={publisher.background_image} alt='game'/>
                                            <h1> {publisher.name}</h1>

                                        </Link>
                                    </div>
                                )
                            }
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default PublishDisplay;