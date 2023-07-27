import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import deck from "../deck.js";

//if user doesnt change values, default to initialState
const initialState = {
	numDecks: 1,
	playerBankroll: 500,
	bet: 25
}

const Menu = ({ setupGame }) => {

	const [values, setValues] = useState(initialState)

	// set state values as user types
	const handleChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value})
	}

	// send values to set in global state
	const handleSubmit = (e) => {
		e.preventDefault()
		// local function
		setupGame(values.numDecks, values.playerBankroll, values.bet)
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

				<label htmlFor="bet">Initial bet?</label>
				<input
					className="bg-color-grey shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="number"
					name="bet"
					value={values.bet}
					min="25" max="1000"
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

/*
// after user selects values, create the shoe with appropriate number of decks
const setupGame = (numDecks, playerBankroll, bet) => {
	const newShoe = []
	for (let i = 0; i < numDecks; i++) {
		newShoe.push(...deck)
		newShoe.sort(() => Math.random() - 0.5)
	}
	newShoe.sort(() => Math.random() - 0.5)
	initialDeal(playerBankroll, bet, newShoe)
}

const initialDeal = (playerBankroll, bet, newShoe) => {

	const { handleBlackjack } = useGlobalContext()

	const playerHand = []  // temp hands for player and dealer that we put in state after deal
	const dealerHand = []

	//----deal out cards, if Ace is dealt, change value from 1 to 11---//
	let nextCard = newShoe.pop()
	if (nextCard.value === 1) {
		nextCard.value = 11
	}
	playerHand.push(nextCard)
	let playerScore = nextCard.value

	nextCard = newShoe.pop()
	if (nextCard.value === 1) {
		nextCard.value = 11
	}
	dealerHand.push(nextCard)
	let dealerScore = nextCard.value

	nextCard = newShoe.pop()
	if (nextCard.value === 1) {
		nextCard.value = 11
	}
	playerHand.push(nextCard)
	playerScore += nextCard.value

	nextCard = newShoe.pop()
	if (nextCard.value === 1) {
		nextCard.value = 11
	}
	dealerHand.push(nextCard)
	dealerScore += nextCard.value

	// check for blackjacks
	let playerBlackjack = false
	let dealerBlackjack = false
	if (playerScore === 21) {
		playerBlackjack = true
	}
	if (dealerScore === 21) {
		dealerBlackjack = true
	}
	if (playerBlackjack || dealerBlackjack) {
		handleBlackjack(playerBlackjack, dealerBlackjack)
	}

	// if no blackjacks, set values to global state, then prompt user options
	let splitOption = false
	if (playerHand[0].value === playerHand[1].value) {
		splitOption = true
	}

}

*/



export default Menu;