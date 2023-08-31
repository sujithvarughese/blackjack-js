import { useGlobalContext } from "../context/GlobalContext.jsx";

const GameInfo = () => {

	const { playerBankroll, bet, playerScore, dealerScore, dealerCardShown } = useGlobalContext()

	return (
		<div className="flex flex-col justify-between relative">
			<div className="absolute top-80">Bankroll: {playerBankroll}</div>
			<div className="">Current Bet: {bet}</div>
			{
				dealerCardShown &&
				<div className="">Dealer Score: {dealerScore}</div>
			}
			<div className="text-4xl">Player Score: {playerScore}</div>
		</div>
	);
};

export default GameInfo;