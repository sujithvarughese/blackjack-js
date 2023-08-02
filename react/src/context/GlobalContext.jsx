import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	HIDE_WELCOME,

	SETUP_GAME,
	PLACE_BETS,
	SET_INITIAL_DEAL,

	HANDLE_BOTH_BLACKJACK,
	HANDLE_PLAYER_BLACKJACK,
	HANDLE_DEALER_BLACKJACK,
	DISPLAY_OPTIONS_ALL,
	DISPLAY_OPTIONS_DOUBLE,
	DISPLAY_OPTIONS_NORMAL,
	PLAYER_BUST,
	PLAYER_SAFE,
	PLAYER_HIT,
	PLAYER_STAY,
	PLAYER_SPLIT,
	PLAYER_DOUBLE,
	DEALER_BUST,
	DEALER_SAFE,
	DEALER_HIT,
	DEALER_STAY,
	PLAYER_WIN,
	DEALER_WIN,
	PUSH,
	NEW_DEAL,
	CLEAR_HANDS
} from './actions.js'

const initialState = {
	shoe: {},
	playerBankroll: 0,
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
	stayOption: false,

	newDealOption: false,
	doubledHand: false,
	splitHand: false,
	dealerCardShown: false
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

	// deal the first two face-up cards for both player and dealer,
	//  set hands to global state, get hand values and set to global state
	//  check for blackjacks and set to global state
	const setupGame = (shoe, playerBankroll) => {
		dispatch({
			type: SETUP_GAME,
			payload: { shoe, playerBankroll}

		})
	}

	const placeBet = (bet) => {
		dispatch({
			type: PLACE_BETS,
			payload: { bet }
		})
		setInitialDeal()
	}

	const setInitialDeal = () => {
		const currentShoe = [...state.shoe]
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
			return handleBlackjack(playerBlackjack, dealerBlackjack, playerHand, dealerHand, currentShoe)
		}
		// if no blackjacks, set values to global state, then prompt user options
		let splitOption = false
		if (playerHand[0].value === playerHand[1].value) {
			splitOption = true
		}
		dispatch({
			type: SET_INITIAL_DEAL,
			payload: {
				shoe: currentShoe,
				playerHand,
				dealerHand,
				playerScore,
				dealerScore,
				splitOption
			}
		})
	}

	const handleBlackjack = (playerBlackjack, dealerBlackjack, playerHand, dealerHand, currentShoe) => {
		if (playerBlackjack && dealerBlackjack) {
			displayAlert('Player and dealer blackjack. Push!')
			dispatch({
				type: HANDLE_BOTH_BLACKJACK,
				payload: { playerHand, dealerHand, shoe: currentShoe }
			})
		} else if (playerBlackjack) {
			displayAlert('Congratulations! You have blackjack!')
			dispatch({
				type: HANDLE_PLAYER_BLACKJACK,
				payload: { playerHand, dealerHand, shoe: currentShoe  }
			})
		} else {
			displayAlert('Dealer has blackjack!')
			dispatch({
				type: HANDLE_DEALER_BLACKJACK,
				payload: { playerHand, dealerHand, shoe: currentShoe  }
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

	const hit = () => {

		const currentShoe = [...state.shoe]
		const currentHand = [...state.playerHand]
		let nextCard = currentShoe.pop()

		// if next card is Ace and total hand value is 10 or less, set the Ace to 11
		if (nextCard.value === 1 && state.playerScore <= 10) {
			nextCard.value = 11
		}

		currentHand.push(nextCard)
		const newPlayerScore = state.playerScore + nextCard.value

		if (newPlayerScore > 21) {
			displayAlert('Player bust!')
			dispatch({
				type: PLAYER_BUST,
				payload: { shoe: currentShoe, playerHand: currentHand, playerScore: newPlayerScore }
			})
		}
		else {
			dispatch({
				type: PLAYER_SAFE,
				payload: { shoe: currentShoe, playerHand: currentHand, playerScore: newPlayerScore }
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






	const dealerMove = () => {
		const currentShoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const dealerHand = [...state.dealerHand]  // temp hands for dealer that we put in state
		let dealerScore = state.dealerScore

		while (dealerScore <= 16) {
			let nextCard = currentShoe.pop()

			// if next card is Ace and total hand value is 10 or less, set the Ace to 11
			if (nextCard.value === 1 && dealerScore <= 10) {
				nextCard.value = 11
			}
			dealerScore += nextCard.value
			dealerHand.push(nextCard)

			if (dealerScore > 21) {
				displayAlert('Dealer bust!')
				dispatch({
					type: DEALER_BUST,
					payload: { shoe: currentShoe, dealerHand }
				})
			}
			else {
				dispatch({
					type: DEALER_SAFE,
					payload: { shoe: currentShoe, dealerHand, dealerScore }
				})
			}
		}
		if (dealerScore <= 21) {
			determineWinner()
		}
	}

	const determineWinner = () => {

		if (state.playerScore <= 21 && state.dealerScore <= 21) {
			if (state.playerScore > state.dealerScore) {
				displayAlert('Player win!', 10000)
				dispatch({
					type: PLAYER_WIN,
				})
			}
			else if (state.dealerScore > state.playerScore) {
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
				placeBet,
				handleBlackjack,
				newDeal,
				hit,
				stay,
				double,
				split


			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext };