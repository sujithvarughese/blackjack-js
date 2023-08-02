import { useGlobalContext } from "../context/GlobalContext.jsx";

const PlayerOptions = () => {

	const {
		newDealOption,
		insuranceOption,
		splitOption,
		doubleOption,
		hitOption,
		stayOption,
		hit,
		stay,
		double,
		split
	} = useGlobalContext()

	return (
		<div className="flex gap-1">

			{hitOption &&
				<>
					<button onClick={hit} className="btn">hit!</button>
					<button onClick={stay} className="btn">stay!</button>
				</>

			}
			{stayOption &&
				<button onClick={stay} className="btn">stay!</button>
			}
			{newDealOption &&
				<button onClick={newDeal} className="btn">Play Again!</button>
			}
			{insuranceOption &&
				<button onClick={insurance} className="btn">Take Insurance!</button>
			}
			{splitOption &&
				<button onClick={split} className="btn">split!</button>
			}
			{doubleOption &&
				<button onClick={double} className="btn">double!</button>
			}


		</div>
	);
};

export default PlayerOptions;