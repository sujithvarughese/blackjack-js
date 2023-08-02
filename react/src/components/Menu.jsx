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
			<form className="form" onSubmit={handleSubmit}>

				<p className="form-title">Plan your downfall!</p>

				<label className="form-label" htmlFor="numDecks">How many decks?</label>
				<input
					className="form-input"
					type="number"
					name="numDecks"
					value={values.numDecks}
					min="1" max="8"
					onChange={handleChange}
				/>

				<label className="form-label" htmlFor="playerBankroll">How much money you wanna lose?</label>
				<input
					className="form-input"
					type="number"
					name="playerBankroll"
					value={values.playerBankroll}
					min="100" max="10000"
					onChange={handleChange}
				/>

				<button
					className="btn"
					type="submit"
				>submit
				</button>

			</form>

		</div>
	);
};

export default Menu;