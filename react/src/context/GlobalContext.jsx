import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import deck from "../deck.js";

import {
	DISPLAY_ALERT,
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
	DEALER_STAY,
	PLAYER_WIN,
	DEALER_WIN,
	PUSH,
	NEW_DEAL,
	CLEAR_HANDS
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

	const displayAlert = (alertText, ms = 1500) => {
		dispatch({
			type: DISPLAY_ALERT,
			payload: { alertText }
		})
		clearAlert(ms)
	}

	const clearAlert = (ms) => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, ms)
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
	const initialDeal = async (bet) => {
		console.log(state);
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

		await dispatch({
			type: INITIAL_DEAL_SUCCESS,
			payload : { currentShoe, playerHand, dealerHand, playerScore, dealerScore }
		})

		displayAlert('Checking for blackjack...')

		await dispatch({
			type: CHECK_BLACKJACK_BEGIN,
		})

		if (playerScore === 21) {
			await dispatch({
				type: SET_PLAYER_BLACKJACK,
			})
		}
		if (dealerScore === 21) {
			await dispatch({
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

	const handleBlackjack = async () => {
		if (state.player.hasBlackjack && state.dealer.hasBlackjack) {
			displayAlert('Player and dealer blackjack. Push!')
			await dispatch({
				type: HANDLE_BOTH_BLACKJACK,
			})
		}
		else if (state.player.hasBlackjack) {
			displayAlert('Congratulations! You have blackjack!')
			await dispatch({
				type: HANDLE_PLAYER_BLACKJACK,
			})
		}
		else if (state.dealer.hasBlackjack) {
			displayAlert('Dealer has blackjack!')
			await dispatch({
				type: HANDLE_DEALER_BLACKJACK,
			})
		}
		else {
			getInitialOptions()
		}

	}

	const getInitialOptions = async () => {
		if (state.player.hand[0] === state.player.hand[1]) {
			await dispatch({
				type: DISPLAY_OPTIONS_ALL,
			})
		}
		else {
			await dispatch({
				type: DISPLAY_OPTIONS_DOUBLE,
			})
		}
	}
	const insurance = () => {
		console.log('insurance');
	}
	const split = () => {
		console.log('split');
	}

	const double = async () => {
		console.log('double');
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = [...state.player.hand]  // temp hands for player and dealer that we put in state after deal
		let playerScore = state.player.score

		let nextCard = currentShoe.pop()

		if (nextCard.value === 1 && playerScore <= 10) {
			nextCard.value = 11
		}
		playerScore += nextCard.value
		playerHand.push(nextCard)
		if (playerScore > 21) {
			displayAlert('Player Bust! Try again!')
			await dispatch({
				type: PLAYER_BUST,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
		else {
			await dispatch({
				type: PLAYER_DOUBLE,
				payload: { currentShoe, playerHand, playerScore }
			})
		}
		setTimeout(() => {
			dealerMove()
		}, 1500)
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
			displayAlert('Player bust!')
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
		dispatch({
			type: PLAYER_STAY,
		})
		setTimeout(() => {
			dealerMove()
		}, 1500)
	}



	const dealerMove = async () => {
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const dealerHand = [...state.dealer.hand]  // temp hands for dealer that we put in state
		let dealerScore = state.dealer.score

		while (dealerScore <= 16) {
			let nextCard = currentShoe.pop()

			// if next card is Ace and total hand value is 10 or less, set the Ace to 11
			if (nextCard.value === 1 && dealerScore <= 10) {
				nextCard.value = 11
			}
			dealerScore += nextCard.value
			dealerHand.push(nextCard)

			await dispatch({
				type: DEALER_HIT,
				payload: { currentShoe, dealerHand, dealerScore }
			})
		}
		console.log(state);
		if (dealerScore > 21) {
			console.log('dealer bust');
			displayAlert('Dealer bust! Player win!', 10000)
			dispatch({
				type: PLAYER_WIN
			})
		}
		else {
			setTimeout(() => {
				determineWinner()
			}, 1500)
		}


	}

	const determineWinner = () => {

		if (state.player.score <= 21 && state.dealer.score <= 21) {
			if (state.player.score > state.dealer.score) {
				displayAlert('Player win!', 10000)
				dispatch({
					type: PLAYER_WIN,
				})
			}
			else if (state.dealer.score > state.player.score) {
				displayAlert('Dealer Win. You Lose!', 10000)
				dispatch({
					type: DEALER_WIN,
				})
			}
			else {
				displayAlert("Push!", 10000)
				dispatch({
					type: PUSH,
				})
			}
		}
	}

	const newDeal = () => {
		console.log('newDeal');
	}

	const clearHands = () => {

	}


	return (
		<GlobalContext.Provider value={
			{
				...state,
				displayAlert,
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