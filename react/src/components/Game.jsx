import Menu from "./Menu.jsx";
import Player from "./Player.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import PlaceBets from "./PlaceBets.jsx";
import Dealer from "./Dealer.jsx";
import Alert from "./Alert.jsx";
import PlayerOptions from "./PlayerOptions.jsx";
import tableIMG from '../images/table-main.jpeg'
import GameInfo from "./GameInfo.jsx";


const Game = () => {

	const {showAlert, handInProgress, showMenu, playerOptions, canPlaceBets, } = useGlobalContext()



	return (
		<div className="game border-4 border-green-500">
			<div className="game-container border-4 border-cyan-500">

				<img className="table-img" src={tableIMG} alt="table-img"/>
				<div className="hand player border-2 border-purple-500">{ handInProgress  && <Player />}</div>
				<div className="hand dealer  border-2 border-purple-500">{ handInProgress && <Dealer />}</div>
				<div className="menu border-2 border-purple-500 absolute">{ showMenu && <Menu/>}</div>
				<div className="bets border-2 border-purple-500">	{ canPlaceBets && <PlaceBets />}</div>
				<div className="alert border-2 border-purple-500">	{ showAlert && <Alert />}</div>
				<div className="options border-2 border-blue-500">	{ playerOptions && <PlayerOptions /> }</div>
			</div>
			<div>
				<GameInfo />
			</div>


		</div>
	)
}


export default Game