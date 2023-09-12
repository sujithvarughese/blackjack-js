import { useGlobalContext } from "../context/GlobalContext.jsx";

const CurrentBet = () => {

	const { bet } = useGlobalContext()

	return (
		<div>
			<div className="">Bet: ${bet}</div>
		</div>
	);
};

export default CurrentBet;