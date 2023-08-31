import { Menu, Player, PlaceBets, Dealer, Alert, PlayerOptions, GameInfo, Assist, PlayerScore, DealerScore } from ".";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const Game = () => {

	const {showAlert, handInProgress, showMenu, playerOptions, canPlaceBets, showAssist } = useGlobalContext()



	return (
		<div className="game">
			<div className="game-container">

				{/*		<img className="table-img" src={tableIMG} alt="table-img"/>*/}
				<div className="hand player">{ handInProgress  && <Player />}</div>
				<div className="hand dealer">{ handInProgress && <Dealer />}</div>
				<div className="menu">{ showMenu && <Menu/>}</div>
				<div className="player-score"><PlayerScore /></div>
				<div className="dealer-score"><DealerScore /></div>
				<div className="bets">	{ canPlaceBets && <PlaceBets />}</div>
				<div className="alert">	{ showAlert && <Alert />}</div>
				<div className="options">	{ playerOptions && <PlayerOptions /> }</div>
				<div className="assist">{ showAssist && <Assist/>}</div>
			</div>
			<div className="info">
				<GameInfo/>
			</div>


		</div>
	)
}


export default Game