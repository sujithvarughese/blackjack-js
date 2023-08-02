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

	PLAYER_BUST,
	PLAYER_SAFE,
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
} from './actions.js'

const initialState = {
	shoe: {},
	playerBankroll: 0,
	bet: 25,
	playerHand: [],
	playerAces: 0,
	playerBlackjack: false,
	playerScore: 0,
	dealerHand: [],
	dealerBlackjack: false,
	dealerAces: 0,
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

	// after user chooses numDecks and bankroll, create shoe of cards, set shoe and bankroll to global state
	const setupGame = (shoe, playerBankroll) => {
		dispatch({
			type: SETUP_GAME,
			payload: { shoe, playerBankroll}

		})
	}
	// user places initial bet, set to state, then cards are dealt
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
		let playerAces = state.playerAces
		let dealerAces = state.dealerAces
		//----deal out cards, if Ace is dealt, change value from 1 to 11---//
		let nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			playerAces++
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		let playerScore = nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			dealerAces++
			nextCard.value = 11
		}
		dealerHand.push(nextCard)
		let dealerScore = nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			playerAces++
			nextCard.value = 11
		}
		playerHand.push(nextCard)
		playerScore += nextCard.value

		nextCard = currentShoe.pop()
		if (nextCard.value === 1) {
			dealerAces++
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

		// if blackjack is found, send values to handleBlackjack function to end the end and set values in global state
		if (playerBlackjack || dealerBlackjack) {
			return handleBlackjack(playerBlackjack, dealerBlackjack, playerHand, dealerHand, currentShoe)
		}
		// if no blackjacks, set values to global state, then prompt user options
		let splitOption = false
		// if player's first 2 cards are equal value, option to split for player = true
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
				splitOption,
				playerAces,
				dealerAces
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

	const hit = () => {
		// get shoe from state, get player's hand
		const shoe = [...state.shoe]
		const playerHand = [...state.playerHand]
		let playerAces = state.playerAces
		const bet = state.bet

		let nextCard = shoe.pop()

		// if next card is Ace and total hand value is 10 or less, set the Ace to 11
		if (nextCard.value === 1) {
			playerAces++
			if (state.playerScore <= 10) {
				nextCard.value = 11
			}
		}
		playerHand.push(nextCard)
		let playerScore = state.playerScore + nextCard.value

		// if player has an ace in hand that was valued at 11 and subsequently goes over 21, we can change the 11 to 1
		if (playerScore > 21 && playerAces > 0) {
			playerScore -= 10
			playerAces--
		}

		if (playerScore > 21) {
			displayAlert('Player bust!')
			dispatch({
				// end the hand after displaying outcome, dealer wins: set all player options to false, set canPlaceBets to true
				type: PLAYER_BUST,
				payload: { shoe, playerHand, playerScore, bet }
			})
		}
		else {
			dispatch({
				// update state values; options are kept on screen so user can hit or stay again
				type: PLAYER_SAFE,
				payload: { shoe, playerHand, playerScore, playerAces }
			})
		}
	}
	// if user chooses stay, options are removed from display; dealerMove() is next
	const stay = () => {
		dispatch({
			type: PLAYER_STAY,
		})
		setTimeout(() => {
			dealerMove()
		}, 1500)
	}

	const insurance = () => {
		console.log('insurance');
	}
	const double = () => {
		let bet = state.bet * 2
		const shoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const playerHand = [...state.playerHand]  // temp hands for player and dealer that we put in state after deal
		let playerScore = state.playerScore

		let nextCard = shoe.pop()

		if (nextCard.value === 1 && playerScore <= 10) {
			nextCard.value = 11
		}
		playerScore += nextCard.value
		playerHand.push(nextCard)
		if (playerScore > 21) {
			displayAlert('Player Bust! Try again!')
			dispatch({
				type: PLAYER_BUST,
				payload: { shoe, playerHand, playerScore, bet }
			})
		}
		else {
			dispatch({
				type: PLAYER_DOUBLE,
				payload: { shoe, playerHand, playerScore, bet }
			})
		}
		setTimeout(() => {
			dealerMove()
		}, 1500)
	}


	const dealerMove = () => {
		const shoe = [...state.shoe]  // set temp shoe in order to update global state after deal
		const dealerHand = [...state.dealerHand]  // temp hands for dealer that we put in state
		let dealerScore = state.dealerScore
		let dealerAces = state.dealerAces

		while (dealerScore <= 16) {
			let nextCard = shoe.pop()

			// if next card is Ace and total hand value is 10 or less, set the Ace to 11
			if (nextCard.value === 1 && dealerScore <= 10) {
				dealerAces++
				nextCard.value = 11
			}
			dealerScore += nextCard.value
			dealerHand.push(nextCard)

			if (dealerScore > 21 && dealerAces > 0) {
				dealerScore -= 10
				dealerAces--
			}
			if (dealerScore > 21) {
				displayAlert('Dealer bust!')
				dispatch({
					type: DEALER_BUST,
					payload: { shoe, dealerHand, dealerScore }
				})
			}
			else {
				dispatch({
					type: DEALER_SAFE,
					payload: { shoe, dealerHand, dealerScore, dealerAces }
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


			}
		}>
			{ children }
		</GlobalContext.Provider>
	)

}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalProvider, useGlobalContext };