import React, {useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import "./style/mygames.css"
import GameItem from "../components/GameItem";





const MyGames = ({...props}) => {

    const [data,setData]=useState({});
    const [games, setGames] = useState(data.games);

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
            console.log(response.data);
        }).catch(()=>{
            localStorage.clear();
            props.history.push('/');
        })
    },[props.history])


    function getTotalPlaytime(games) {
        const totalSeconds = data.games?.reduce((total, game) => total + game.playtime* 3600, 0);
        const months = Math.floor(totalSeconds / 2592000);
        const days = Math.floor((totalSeconds % 2592000) / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        return `${months} month(s), ${days} day(s), ${hours} hour(s)`;
    }

    const totalPlaytime = getTotalPlaytime(data.games);


    const sorting = (e) => {
        e.preventDefault();
        let sortValue = e.target.value;
        switch (sortValue) {
            case "addedAt":
                data.games.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
                break;
            case "rating":
                data.games.sort((a, b) => b.rating - a.rating);
                break;
            case "playtime":
                data.games.sort((a, b) => b.playtime - a.playtime);
                break;
            case "released":
                data.games.sort((a, b) => new Date(a.released) - new Date(b.released));
                break;
        }
        setGames(sortValue);
    };












    return (
        <div className='games'>
            <h1 className="myGameH1">Beaten games: {data.games?.length}</h1>
            <h1 className="myGameH1">Time spend: {totalPlaytime}</h1>
                    <select className="sort-selection"  name="sort" id="sort" onChange={sorting}>
                        <option value="addedAt">Time Added</option>
                        <option value="released">Time Released</option>
                        <option value="rating">Average Rating</option>
                        <option value="playtime">Average Playtime</option>


                    </select>
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