import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import deck from "../deck.js";

import {
	HIDE_WELCOME,
	SETUP_GAME,
	SETUP_INITIAL_DEAL
} from './actions.js'

const initialState = {
	numDecks: 1,
	shoe: [],
	bet: 0,
	player: {
		hand: [],
		score: 0,
		bankroll: 0
	},
	dealer: {
		hand: [],
		score: 0,
		bankroll: 0
	},
	showWelcome: true,
	showMenu: false,
	canPlaceBets: false
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	// hide startup screen -> take user to main menu
	const hideWelcome = () => {
		dispatch({ type: HIDE_WELCOME })
	}

	// after user selects values, create the shoe with appropriate number of decks
	const setupGame = (numDecks, playerBankroll, dealerBankroll) => {
		const newShoe = []
		for (let i = 0; i < numDecks; i++) {
			newShoe.push(...deck)
			newShoe.sort(() => Math.random() - 0.5)
		}
		newShoe.sort(() => Math.random() - 0.5)
		dispatch({
			type: SETUP_GAME,
			payload: { numDecks, newShoe, playerBankroll, dealerBankroll }
		})
	}

	// deal the first two face-up cards for both player and dealer
	const initialDeal = (bet) => {
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = []  // temp hands for player and dealer that we put in state after deal
		const dealerHand = []
		let nextCard = currentShoe.pop()
		playerHand.push(nextCard)
		let playerScore = nextCard.value

		nextCard = currentShoe.pop()
		dealerHand.push(nextCard)
		let dealerScore = nextCard.value

		nextCard = currentShoe.pop()
		playerHand.push(nextCard)
		playerScore += nextCard.value

		nextCard = currentShoe.pop()
		dealerHand.push(nextCard)
		dealerScore += nextCard.value

		dispatch({
			type: SETUP_INITIAL_DEAL,
			payload : { currentShoe, playerHand, dealerHand, playerScore, dealerScore, bet }
		})

	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				hideWelcome,
				setupGame,
				initialDeal
			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };