import { useGlobalContext } from "../context/GlobalContext.jsx";

const GameInfo = () => {

	const { playerBankroll, bet, playerScore, dealerScore } = useGlobalContext()

	return (
		<div className="flex justify-between">
			<div className="info">Bankroll: {playerBankroll}</div>
			<div className="info">Current Bet: {bet}</div>
			<div className="info">Player Score: {playerScore}</div>
			<div className="info">Dealer Score: {dealerScore}</div>
		</div>
	);
};

export default GameInfo;