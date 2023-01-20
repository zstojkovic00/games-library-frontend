import React from "react";


const GameList = (props) => {
    return (
        <>

            {
                props.games.map((game,index)=>
                <div>
                    <img src={game.background_image} alt='game' />
                </div>
                )
            }
        </>
    )
}

export default GameList;