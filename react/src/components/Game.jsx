import classes from "./styles/Game.module.css";
import { Menu, Player, PlaceBets, Dealer, Alert, PlayerOptions, Assist, PlayerScore, DealerScore, Bankroll, CurrentBet, BtnAssist } from ".";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { AnimatePresence } from "framer-motion";

const Game = () => {

	const {showAlert, handInProgress, showMenu, playerOptions, canPlaceBets, showAssist } = useGlobalContext()



	return (
		<AnimatePresence>
		<div className="game">
			<div className={classes.container}>

				{/*		<img className="table-img" src={tableIMG} alt="table-img"/>*/}
				<div>{ handInProgress  && <Player />}</div>
				<div>{ handInProgress && <Dealer />}</div>
				<div className="menu">{ showMenu && <Menu/>}</div>
				<div className="info bankroll"><Bankroll /></div>
				<div><CurrentBet /></div>
				<div className="info player-score"><PlayerScore /></div>
				<div className="info dealer-score"><DealerScore /></div>
				<div>{ canPlaceBets && <PlaceBets />}</div>
				<div className="alert">	{ showAlert && <Alert />}</div>
				<div className="options">	{ playerOptions && <PlayerOptions />}</div>
				<div className="help absolute top-0">	{ playerOptions && <BtnAssist />}</div>
				<div className="assist">{ showAssist && <Assist/>}</div>
			</div>
		</div>
		</AnimatePresence>
	)
}


export default Game