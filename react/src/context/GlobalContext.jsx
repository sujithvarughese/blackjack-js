import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import deck from "../deck.js";

import {
	CLEAR_ALERT,
	HIDE_WELCOME,
	SETUP_GAME,
	INITIAL_DEAL_BEGIN,
	INITIAL_DEAL_SUCCESS,
	CHECK_BLACKJACK_BEGIN,
	SET_PLAYER_BLACKJACK,
	SET_DEALER_BLACKJACK,
	CHECK_BLACKJACK_SUCCESS,
	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,
	DISPLAY_OPTIONS_ALL,
	DISPLAY_OPTIONS_DOUBLE,
	DISPLAY_OPTIONS_NORMAL,
	PLAYER_BUST,
	PLAYER_HIT,
	PLAYER_STAY,
	PLAYER_SPLIT,
	PLAYER_DOUBLE,
	DEALER_BUST,
	DEALER_HIT,
	NEW_DEAL
} from './actions.js'

const initialState = {
	numDecks: 1,
	shoe: [],
	bet: 0,
	player: {
		hasBlackjack: false,
		hand: [],
		score: 0,
		bankroll: 0,
	},
	dealer: {
		hasBlackjack: false,
		hand: [],
		score: 0
	},
	isLoading: false,
	handInProgress: false,
	showWelcome: true,
	showMenu: false,
	alert: '',
	showAlert: false,
	canPlaceBets: false,

	playerOptions: false,
	insuranceOption: false,
	splitOption: false,
	doubleOption: false,
	hitOption: false,
	newDealOption: false,
	doubledHand: false,
	splitHand: false
}

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 1000)
	}

	// hide startup screen -> take user to main menu
	const hideWelcome = () => {
		dispatch({ type: HIDE_WELCOME })
	}

	// after user selects values, create the shoe with appropriate number of decks
	const setupGame = (numDecks, playerBankroll) => {
		const newShoe = []
		for (let i = 0; i < numDecks; i++) {
			newShoe.push(...deck)
			newShoe.sort(() => Math.random() - 0.5)
		}
		newShoe.sort(() => Math.random() - 0.5)
		dispatch({
			type: SETUP_GAME,
			payload: { numDecks, playerBankroll, newShoe }
		})
	}

	// deal the first two face-up cards for both player and dealer,
	//  set hands to global state, get hand values and set to global state
	//  check for blackjacks and set to global state
	const initialDeal = (bet) => {
		dispatch({
			type: INITIAL_DEAL_BEGIN,
			payload : { bet }
		})
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = []  // temp hands for player and dealer that we put in state after deal
		const dealerHand = []

		//----deal out cards, if Ace is dealt, change value from 1 to 11---//
		let nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		let playerScore = nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		let dealerScore = nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		playerScore += nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		dealerScore += nextCard.value
		//---------------------------------//

		dispatch({
			type: INITIAL_DEAL_SUCCESS,
			payload : { currentShoe, playerHand, dealerHand, playerScore, dealerScore }
		})

		dispatch({
			type: CHECK_BLACKJACK_BEGIN,
		})

		if (playerScore === 21) {
			dispatch({
				type: SET_PLAYER_BLACKJACK,
			})
		}
		if (dealerScore === 21) {
			dispatch({
				type: SET_DEALER_BLACKJACK,
			})
		}
		// wait so 'Checking for blackjack...' alert can be seen by user before clearing
		setTimeout(() => {
			dispatch({
				type: CHECK_BLACKJACK_SUCCESS
			})
			handleBlackjack()
		}, 1500)

	}

	const handleBlackjack = () => {
		if (state.player.hasBlackjack && state.dealer.hasBlackjack) {
			dispatch({
				type: HANDLE_BOTH_BLACKJACK,
			})
		}
		else if (state.player.hasBlackjack) {
			dispatch({
				type: HANDLE_PLAYER_BLACKJACK,
			})
		}
		else if (state.dealer.hasBlackjack) {
			dispatch({
				type: HANDLE_DEALER_BLACKJACK,
			})
		}
		getInitialOptions()
	}

	const getInitialOptions = () => {
		if (state.player.hand[0] === state.player.hand[1]) {
			dispatch({
				type: DISPLAY_OPTIONS_ALL,
			})
		}
		else {
			dispatch({
				type: DISPLAY_OPTIONS_DOUBLE,
			})
		}
	}

	const hit = () => {
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = [...state.player.hand]  // temp hands for player that we put in state after deal
		let playerScore = state.player.score

		let nextCard = currentShoe.pop()
		playerScore += nextCard.value

		// if next card is Ace and total hand value is 10 or less, set the Ace to 11
		if (nextCard.value === 1 && playerScore <= 10) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)

		if (playerScore > 21) {
			dispatch({
				type: PLAYER_BUST,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
		else {
			dispatch({
				type: PLAYER_HIT,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
	}

	const stay = () => {
		console.log('stay');
		dispatch({
			type: PLAYER_STAY,
		})
		setTimeout(() => {
			dealerMove()
		}, 1500)
	}

	const double = () => {
		console.log('double');
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = [...state.player.hand]  // temp hands for player and dealer that we put in state after deal
		let playerScore = state.player.score

		let nextCard = currentShoe.pop()
		playerScore += nextCard.value

		if (nextCard.value === 1 && playerScore <= 11) {
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		if (playerScore > 21) {
			dispatch({
				type: PLAYER_BUST,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
		else {
			dispatch({
				type: PLAYER_DOUBLE,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
		setTimeout(() => {
			dealerMove()
		}, 1500)
	}

	const dealerMove = () => {
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const dealerHand = [...state.dealer.hand]  // temp hands for dealer that we put in state
		let dealerScore = state.dealer.score

		let nextCard = currentShoe.pop()
		dealerScore += nextCard.value

		// if next card is Ace and total hand value is 10 or less, set the Ace to 11
		if (nextCard.value === 1 && dealerScore <= 10) {
			nextCard.value = 11
		}
		dealerHand.push(nextCard)

		if (dealerScore > 21) {
			dispatch({
				type: DEALER_BUST,
				payload: { currentShoe, dealerHand, dealerScore }
			})
		}
		else {
			dispatch({
				type: DEALER_HIT,
				payload: { currentShoe, dealerHand, dealerScore }
			})
		}
	}

	const split = () => {
		console.log('split');
	}

	const newDeal = () => {
		console.log('newDeal');
	}

	const insurance = () => {
		console.log('insurance');
	}

	return (
		<GlobalContext.Provider value={
			{
				...state,
				hideWelcome,
				setupGame,
				initialDeal,
				hit,
				stay,
				double,
				split,
				newDeal,
				insurance

			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext, initialState };