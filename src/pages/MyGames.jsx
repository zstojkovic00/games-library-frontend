import React, {useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import "./style/mygames.css"
import GameItem from "../components/GameItem";





const MyGames = ({...props}) => {

    const [data,setData]=useState({});

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
            console.log(response.data);
        }).catch(()=>{
            localStorage.clear();
            props.history.push('/');
        })
    },[])






    return (
        <div className='games'>
            <div className='gameList'>

                {

                    data.games?.map((game) =>{
                        return(
                            <GameItem key={game.id} game_id={game.id}  name={game.name} background_image={game.background_image}/>
                        )}

                    )
                }

            </div>
        </div>
    )
}





export default MyGames;