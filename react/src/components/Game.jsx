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

	const {showAlert, handInProgress, showMenu, playerOptions, canPlaceBets, showAddFunds } = useGlobalContext()



	return (
		<div className="game">
			<div className="game-container">

				<img className="table-img" src={tableIMG} alt="table-img"/>
				<div className="hand player">{ handInProgress  && <Player />}</div>
				<div className="hand dealer">{ handInProgress && <Dealer />}</div>
				<div className="menu absolute">{ showMenu && <Menu/>}</div>
				<div className="bets">	{ canPlaceBets && <PlaceBets />}</div>
				<div className="alert">	{ showAlert && <Alert />}</div>
				<div className="options">	{ playerOptions && <PlayerOptions /> }</div>
			</div>
			<div>
				<GameInfo />
			</div>


		</div>
	)
}


export default Game