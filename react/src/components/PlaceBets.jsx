import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";

const PlaceBets = () => {

	const { initialDeal, player, dealer } = useGlobalContext()

	const [bet, setBet] = useState(25)

	// initial bet (global function) places the initial wager into global state, then deals the initial deal (also sets hands and values to global state)
	const handleSubmit = (e) => {
		e.preventDefault()
		initialDeal(bet)
	}

	return (
		<div>
			<form className="w-88" onSubmit={handleSubmit}>
				<label
					className='mt-3 block'
					htmlFor="betAmount"
				>Bet
				</label>
				<input
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					name="bet"
					min="25" max='1000'
					value={bet}
					onChange={e=>setBet(e.target.value)}/>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-auto py-2 px-2 rounded text-xs w-32"
					type="submit"
				>Deal!
				</button>
			</form>
		</div>
	);
};

export default PlaceBets;