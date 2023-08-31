import { useGlobalContext } from "../context/GlobalContext.jsx";

const PlayerScore = () => {
	const { playerScore } = useGlobalContext()

	return (
		<div className="">
			<div className="text-4xl">Player Score: {playerScore}</div>
		</div>
	);
};

export default PlayerScore;