import { useGlobalContext } from "../context/GlobalContext.jsx";

const GameInfo = () => {

	const { playerBankroll, bet, playerScore, dealerScore, dealerCardShown } = useGlobalContext()

	return (
		<div className="flex justify-between">
			<div className="info">Bankroll: {playerBankroll}</div>
			<div className="info">Current Bet: {bet}</div>
			{
				dealerCardShown &&
				<div className="info">Dealer Score: {dealerScore}</div>
			}
			<div className="info">Player Score: {playerScore}</div>
		</div>
	);
};

export default GameInfo;