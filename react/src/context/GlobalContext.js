import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import deck from "../deck.js";

const initialState = {
	numDecks: 1,
	shoe: [],
	player: {
		hand: [],
		score: 0,
		bet: 0,
		bankroll: 0
	},
	dealer: {
		hand: [],
		score: 0,
		bet: 0,
		bankroll: 0
	},
	showWelcome: true,
	showMenu: false,
	showDealButton: false,

}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const hideWelcome = () => {
		dispatch({ type: HIDE_WELCOME })
	}

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

	return (
		<GlobalContext.Provider value={
			{
				...state,
				hideWelcome,
				setupGame
			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };