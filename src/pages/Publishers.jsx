import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {AiOutlineArrowLeft} from "react-icons/ai";

const Publishers = () => {

        const [publishers, setPublishers] = useState([]);
        const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


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

            <div className="queryNaslov">

                <AiOutlineArrowLeft className="buttonBack" onClick={goBack} />
                <motion.h1
                    initial={{ width: "", x: "100vw" ,maxWidth: "100vh"}}
                    animate={{ width: ``, x: 0 }}
                    transition={{ duration: 1, origin: 1 }}


                    className="queryText"> Publishers
                </motion.h1>


            </div>

            <motion.h1

                className="RowText"></motion.h1>

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