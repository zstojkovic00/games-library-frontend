import React from 'react'
import { useNavigate } from "react-router-dom";

function GameItem({background_image, name, id}) {
    const navigate = useNavigate();
    return (
        <div className="gameItem" onClick= {() => {navigate("/game/"+id);}}                              >
            <img className="bgImage" src={background_image} alt='game' />
            {/*<div style={{background: `url(${background_image})`}} className="bgImage"/>*/}
            <h1> {name}</h1>
        </div>
    )
}

export default GameItem;