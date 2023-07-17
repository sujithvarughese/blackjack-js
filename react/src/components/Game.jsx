import Menu from "./Menu.jsx";
import Player from "./Player.jsx";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useEffect, useState } from "react";
import PlaceBets from "./PlaceBets.jsx";
import Dealer from "./Dealer.jsx";
import Alert from "./Alert.jsx";
import PlayerOptions from "./PlayerOptions.jsx";
import tableIMG from '../images/table-main.jpeg'

const Game = () => {

	const { alert, showAlert, handInProgress, showMenu, playerOptions, shoe, canPlaceBets, player, dealer } = useGlobalContext()


	return (
		<div className="border-4 border-red-800">
			<img src={tableIMG} className="w-max" alt="table"/>
			<div className="flex justify-center">
				{ showMenu && <Menu />}
				{ canPlaceBets && <PlaceBets />}
				{ showAlert && <Alert />}
				{ handInProgress  && <Player />}
				{ handInProgress && <Dealer />}
				{ playerOptions && <PlayerOptions /> }
			</div>

		</div>
	)
}

export default Game