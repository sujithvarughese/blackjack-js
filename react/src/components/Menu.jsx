import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import deck from "../deck.js";

//if user doesnt change values, default to initialState
const initialState = {
	numDecks: 1,
	playerBankroll: 500,
	bet: 25
}

const Menu = () => {

	const [values, setValues] = useState(initialState)

	const { setupGame } = useGlobalContext()
	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// send values to set in global state
	const handleSubmit = async (e) => {
		e.preventDefault()
		createShoe(values.numDecks)

	}
	// create shoe function creates shoe and sends to reducer to set in global state
	const createShoe = (numDecks = 1) => {
		// temp shoe array
		const shoe = []
		for (let i = 0; i < numDecks; i++) {
			// push full deck array to newShoe array
			shoe.push(...deck)
			// shuffle
			shoe.sort(() => Math.random() - 0.5)
		}
		// shuffle again once all decks added
		shoe.sort(() => Math.random() - 0.5)
		setupGame(shoe, values.playerBankroll)
	}



	return (
		<div>
			<form className="w-88 border-4 border-red-300" onSubmit={handleSubmit}>

				<p className="text-center m-10 text-2xl">Plan your downfall!</p>

				<label htmlFor="numDecks">How many decks?</label>
				<input
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					name="numDecks"
					value={values.numDecks}
					min="1" max="8"
					onChange={handleChange}
				/>

				<label htmlFor="playerBankroll">How much money you wanna lose?</label>
				<input
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					name="playerBankroll"
					value={values.playerBankroll}
					min="100" max="10000"
					onChange={handleChange}
				/>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded text-xs"
					type="submit"
				>submit
				</button>

			</form>

		</div>
	);
};

export default Menu;