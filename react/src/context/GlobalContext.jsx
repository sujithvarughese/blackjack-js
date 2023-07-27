import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import deck from "../deck.js";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	HIDE_WELCOME,

	SET_INITIAL_DEAL,
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
	shoe: [],
	bankroll: 0,
	bet: 25,
	playerHand: [],
	playerBlackjack: false,
	playerScore: 0,
	dealerHand: [],
	dealerBlackjack: false,
	dealerScore: 0,
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

	const placeBet = async (bet) => {
		console.log(state);
		dispatch({
			type: INITIAL_DEAL_BEGIN,
			payload: { bet }
		})
	}

	// deal the first two face-up cards for both player and dealer,
	//  set hands to global state, get hand values and set to global state
	//  check for blackjacks and set to global state


	const handleBlackjack = async (playerBlackjack, dealerBlackjack) => {
		if (playerBlackjack && dealerBlackjack) {
			displayAlert('Player and dealer blackjack. Push!')
			await dispatch({
				type: HANDLE_BOTH_BLACKJACK,
			})
		} else if (playerBlackjack) {
			displayAlert('Congratulations! You have blackjack!')
			await dispatch({
				type: HANDLE_PLAYER_BLACKJACK,
			})
		} else {
			displayAlert('Dealer has blackjack!')
			await dispatch({
				type: HANDLE_DEALER_BLACKJACK,
			})
		}
	}

	const handleInitialDeal = async(shoe, playerHand, dealerHand, playerScore, dealerScore, playerBankroll, bet, splitOption) => {
		dispatch({
			type: SET_INITIAL_DEAL,
			payload: {
				shoe,
				playerHand,
				dealerHand,
				playerScore,
				dealerScore,
				playerBankroll,
				bet,
				splitOption
			}
		})
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
		console.log('HIT');
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
				handleInitialDeal,
				handleBlackjack,
				placeBet,
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