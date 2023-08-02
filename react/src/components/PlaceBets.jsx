import { useGlobalContext } from "../context/GlobalContext.jsx";
import { useState } from "react";

const PlaceBets = () => {

	const { bet, placeBet } = useGlobalContext()

	const [userBet, setUserBet] = useState(bet)


	const handleChange = (e) => {
		setUserBet(e.target.value)
	}

	// initial bet (global function) places the initial wager into global state, then deals the initial deal (also sets hands and values to global state)
	const handleSubmit = (e) => {
		e.preventDefault()
		placeBet(userBet)
	}

	return (
		<div>
			<form className="form w-88 m-32 border-4 border-red-700 flex flex-col justify-center" onSubmit={handleSubmit}>

				<label
					className='form-label p-4 text-2xl'
					htmlFor="betAmount"
				>Place Bet!
				</label>

				<input
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					name="bet"
					min="25" max='1000'
					value={userBet}
					onChange={handleChange}/>

				<button className="btn" type="submit">Deal!
				</button>

			</form>
		</div>
	);
};

export default PlaceBets;