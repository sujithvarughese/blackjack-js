import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";

//if user doesnt change values, default to initialState
const initialState = {
	numDecks: 1,
	playerBankroll: 500,
	dealerBankroll: 500
}

const Menu = () => {

	const [values, setValues] = useState(initialState)
	// send values and set in global state
	const { setupGame } = useGlobalContext()
	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setupGame(values.numDecks, values.playerBankroll, values.dealerBankroll)
	}

	return (
		<div>
			<p>Plan your downfall!</p>

			<form onSubmit={handleSubmit}>

				<label htmlFor="numDecks">How many decks?</label>
				<input type="number" name="numDecks" value={values.numDecks} min="1" max="8" onChange={handleChange}/>

				<label htmlFor="playerBankroll">How much money you wanna lose?</label>
				<input type="number" name="playerBankroll" value={values.playerBankroll} onChange={handleChange}/>

				<label htmlFor="dealerBankroll">How much should the dealer start with today?</label>
				<input type="number" name="dealerBankroll" value={values.dealerBankroll} onChange={handleChange}/>

				<button type="submit">submit</button>
			</form>

		</div>
	);
};

export default Menu;