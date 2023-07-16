import { useGlobalContext } from "../context/GlobalContext.jsx";

const PlayerOptions = () => {

	const {
		newDealOption,
		insuranceOption,
		splitOption,
		doubleOption,
		hitOption,
		newDeal,
		insurance,
		split,
		double,
		hit,
		stay
	} = useGlobalContext()

	return (
		<div>

			{hitOption &&
				<>
					<button onClick={hit}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					>hit!
					</button>

					<button onClick={stay}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					>stay!
					</button>
				</>
			}
			{
				newDealOption
				&&
				<button onClick={newDeal}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>Play Again!
				</button>
			}
			{
				insuranceOption
				&&
				<button onClick={insurance}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>Take Insurance!
				</button>
			}
			{
				splitOption
					&&
				<button onClick={split}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>split!
				</button>
			}

			{
				doubleOption
					&&
				<button onClick={double}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
				>double!
				</button>
			}


		</div>
	);
};

export default PlayerOptions;