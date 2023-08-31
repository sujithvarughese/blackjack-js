import { useGlobalContext } from "../context/GlobalContext.jsx";

const Bankroll = () => {

	const { playerBankroll } = useGlobalContext()

	return (
		<div>
			<div className="">Bankroll: {playerBankroll}</div>
		</div>
	);
};

export default Bankroll;