import React from 'react'
import {Link} from "react-router-dom";

function GameItem({background_image, name, game_id}) {

    return (
        <div className="gameItem">
            <Link to={`/games/${game_id}`}>
                <img className="bgImage" src={background_image} alt='game'/>
                <h1> {name}</h1>
            </Link>
        </div>
    )
}

export default GameItem;

