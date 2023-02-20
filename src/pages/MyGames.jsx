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


    function getTotalPlaytime(games) {
        const totalSeconds = data.games?.reduce((total, game) => total + game.playtime* 3600, 0);
        const months = Math.floor(totalSeconds / 2592000);
        const days = Math.floor((totalSeconds % 2592000) / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        return `${months} month(s), ${days} day(s), ${hours} hour(s)`;
    }

    const totalPlaytime = getTotalPlaytime(data.games);











    return (
        <div className='games'>
            <h1 className="myGameH1">Beaten games: {data.games?.length}</h1>
            <h1 className="myGameH1">Time spend: {totalPlaytime}</h1>
            <div className='gameList'>

                {

                    data.games?.sort((a, b) => a.name.localeCompare(b.name)).map((game) =>{
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