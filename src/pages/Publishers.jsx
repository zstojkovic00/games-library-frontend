import React, {useEffect, useState} from 'react';
import axios from "axios";
import GameItem from "../components/GameItem";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const Publishers = () => {

        const [publishers, setPublishers] = useState([]);


    const getPublishers = async() => {
        const {data: publisher} = await axios.get("https://api.rawg.io/api/publishers?key="+process.env.REACT_APP_API_KEY+"&ordering=games_count&page_size=40",{
        })
        setPublishers(publisher);
        console.log(publisher);
    }
    useEffect(()=> {
        getPublishers();

    }, []);




    return (
        <div>
            <motion.h1 className="RowText">Publishers</motion.h1>

            <div className='games'>
                <div className='gameList'>

                    {

                        publishers.results?.map((publisher)=>{

                            return(
                                <div className="gameItem"  >
                                    <Link to={`/publisher/${publisher.slug}`}>
                                        <img className="bgImage" src={publisher.image_background} alt='game' />
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

export default Publishers;