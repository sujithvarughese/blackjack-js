import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";

//if user doesnt change values, default to initialState
const initialState = {
	numDecks: 1,
	playerBankroll: 500,
}

const Menu = () => {

	const [values, setValues] = useState(initialState)

	// setupGame (global) creates a new show with user selected amount of decks, and sets players bankroll to global state
	const { setupGame } = useGlobalContext()
	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// send values to set in global state
	const handleSubmit = (e) => {
		e.preventDefault()
		setupGame(values.numDecks, values.playerBankroll)
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