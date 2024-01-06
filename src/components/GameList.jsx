import React from "react";
import GameItem from "./GameItem";
import './Game.css'


const GameList = (props) => {

    return (
        <div className='games'>
            <div className='gameList'>
                {
                    props.games.map((game) => {
                            return (
                                <GameItem key={game.id} game_id={game.id} name={game.name}
                                          background_image={game.background_image}/>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default GameList;