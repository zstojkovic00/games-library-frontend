import React, {useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import "./style/mygames.css"




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
        <>

            <h1 className="myGameH1">Predjene igrice</h1>
            {data.games?.map((game) => (
             <li className="beatenGames" key={game.id}>
                 {game.name}
             </li>
            ))}
        </>
    );
};

export default MyGames;