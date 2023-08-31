import { useGlobalContext } from "../context/GlobalContext.jsx";

const DealerScore = () => {
	const { playerScore } = useGlobalContext()

	return (
		<div className="">
			<div className="text-4xl">Player Score: {playerScore}</div>
		</div>
	);
};

export default DealerScore;