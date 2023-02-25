import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {motion} from "framer-motion";

const PublishDisplay = () => {


    const [gameOfPublisher, setGameOfPublisher] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const {id} = useParams();





    const getGameOfPublisher = async() => {
        const {data: games} = await axios.get("https://api.rawg.io/api/games?key="+process.env.REACT_APP_API_KEY+`&publishers=${id}&page_size=40`,{
        })
        setGameOfPublisher(games);
        console.log(games);


    }
    useEffect(()=> {
        getGameOfPublisher();



    }, []);



    return (
        <div>
            <motion.h1 className="RowText">Games of {id.toLowerCase()
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}</motion.h1>
            <div className='games'>
                <div className='gameList'>



                    {

                        gameOfPublisher.results?.map((publisher,index)=>{
                            return(
                                <div className="gameItem" key={index} >

                                    <Link to={`/games/${publisher.id}`}>

                                        <img className="bgImage" src={publisher.background_image} alt='game' />
                                        <h1> {publisher.name}</h1>

                                    </Link>
                                </div>
                            )}



                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default PublishDisplay;