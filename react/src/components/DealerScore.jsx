import { useGlobalContext } from "../context/GlobalContext.jsx";

const DealerScore = () => {
	const { dealerScore, dealerCardShown } = useGlobalContext()

	return (
		<div className="">
			{
				dealerCardShown &&
				<div className="">Dealer Score: {dealerScore}</div>
			}
		</div>
	);
};

export default DealerScore;