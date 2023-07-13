import Menu from "./Menu.jsx";
import Player from "./Player.jsx";
import { useGlobalContext } from "../context/GlobalContext.js";

const Game = () => {

	const { showMenu, showDealButton } = useGlobalContext()

	const deal = () => {

	}

	return (
		<div>
			{ showMenu && <Menu />}

			{ showDealButton && <button onClick={deal}>Deal!</button> }


		</div>
	)
}

export default Game