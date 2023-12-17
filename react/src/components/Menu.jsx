import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import { createShoe } from "../deck.js";
import Button from "../ui/Button.jsx";
import { motion } from "framer-motion"

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

	// - send values createShoe() in deck.js to return shoe
	// - send new shoe and bankroll selected by user to setupGame() which sets global state
	const handleSubmit = async (e) => {
		e.preventDefault()
		const newShoe = createShoe(values.numDecks)
		setupGame(newShoe, values.playerBankroll)
	}

	return (

			<motion.form
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.1 }}
				className="form mx-auto" onSubmit={handleSubmit}>

				<p className="form-title">Main Menu</p>

				<div className="form-content">
					<label className="form-label" htmlFor="numDecks">How many decks?</label>
					<input
						className="form-input"
						type="number"
						name="numDecks"
						value={values.numDecks}
						min="1" max="8"
						onChange={handleChange}
					/>

					<label className="form-label" htmlFor="playerBankroll">Choose a starting bankroll</label>
					<input
						className="form-input"
						type="number"
						name="playerBankroll"
						value={values.playerBankroll}
						min={100} max={1000000000}
						onChange={handleChange}
					/>
				</div>


				<Button className="btn" type="submit">Start!</Button>

			</motion.form>


	);
};

export default Menu;